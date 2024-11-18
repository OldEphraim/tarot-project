package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"

	"github.com/google/uuid"
)

func GetFavoriteByIdHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Extract favorite ID from the URL path
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 5 || pathParts[4] == "" {
		http.Error(w, "Invalid favorite ID in URL", http.StatusBadRequest)
		return
	}
	favoriteID, err := uuid.Parse(pathParts[4])
	if err != nil {
		log.Printf("Invalid UUID format for favorite ID: %v\n", err)
		http.Error(w, "Invalid favorite ID format", http.StatusBadRequest)
		return
	}

	// Verify JWT and extract user information
	tokenString := r.Header.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}
	userID, err := auth.ValidateJWT(tokenString, jwtSecret)
	if err != nil {
		log.Printf("JWT validation failed: %v\n", err)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Fetch the specific favorite from the database
	favorite, err := dbQueries.GetFavoriteById(r.Context(), favoriteID)
	if err != nil {
		log.Printf("Error retrieving favorite: %v\n", err)
		http.Error(w, "Favorite not found", http.StatusNotFound)
		return
	}

	// Ensure the favorite belongs to the authenticated user
	if favorite.UserID != userID {
		log.Printf("User ID mismatch: token userID=%v, favorite userID=%v\n", userID, favorite.UserID)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Respond with the favorite details
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id":            favorite.ID,
		"image_url":     favorite.ImageUrl,
		"card_name":     favorite.CardName,
		"art_style":     favorite.ArtStyle,
		"journal_entry": favorite.JournalEntry,
		"created_at":    favorite.CreatedAt,
		"updated_at":    favorite.UpdatedAt,
	})
}
