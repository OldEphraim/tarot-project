package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"

	"github.com/google/uuid"
)

func AddToFavoritesHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Parse request body
	var input struct {
		UserID       uuid.UUID    `json:"user_id"`
		ImageURL     string       `json:"image_url"`
		CardName     string       `json:"card_name"`
		ArtStyle     string       `json:"art_style"`
		JournalEntry *string      `json:"journal_entry,omitempty"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Verify JWT and extract user information
	tokenString := r.Header.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:] 
	}
	userID, err := auth.ValidateJWT(tokenString, jwtSecret)
	if err != nil || userID != input.UserID {
		log.Printf("JWT validation failed or user ID mismatch: token error=%v, parsed userID=%v, submitted userId=%v\n", err, userID, input.UserID)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Convert *string to sql.NullString
	journalEntry := sql.NullString{
		String: "",
		Valid:  false,
	}
	if input.JournalEntry != nil {
		journalEntry = sql.NullString{
			String: *input.JournalEntry,
			Valid:  true,
		}
	}

	// Add to favorites in the database
	newFavorite, err := dbQueries.AddFavorite(r.Context(), database.AddFavoriteParams{
		UserID:       userID,
		ImageUrl:     input.ImageURL,
		CardName:     input.CardName,
		ArtStyle:     input.ArtStyle,
		JournalEntry: journalEntry,
	})
	if err != nil {
		log.Printf("Error adding to favorites: %v\n", err)
		http.Error(w, "Could not add favorite", http.StatusInternalServerError)
		return
	}

	// Respond with success and include the newly created favorite details
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":      "Image added to favorites",
		"id":           newFavorite.ID,
		"user_id":      newFavorite.UserID,
		"image_url":    newFavorite.ImageUrl,
		"card_name":    newFavorite.CardName,
		"art_style":    newFavorite.ArtStyle,
		"journal_entry": newFavorite.JournalEntry.String,
		"created_at":   newFavorite.CreatedAt,
	})
}
