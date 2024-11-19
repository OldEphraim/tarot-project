package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"

	"github.com/google/uuid"
)

func UpdateJournalEntryHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Extract favorite ID from the URL
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

	// Parse request body for the new journal entry
	var input struct {
		JournalEntry string `json:"journal_entry"` // Expect a plain string
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Convert the string to sql.NullString
	nullJournalEntry := sql.NullString{
		String: input.JournalEntry,
		Valid:  strings.TrimSpace(input.JournalEntry) != "", // Valid is true if not empty
	}
	log.Printf("Parsed journal entry: %+v\n", nullJournalEntry)

	// Perform the database update
	err = dbQueries.UpdateJournalEntry(r.Context(), database.UpdateJournalEntryParams{
		JournalEntry: nullJournalEntry,
		ID:           favoriteID,
		UserID:       userID,
	})
	if err != nil {
		log.Println("this is the error the journal entry is hitting, likely to do with the sql.nullStrin data type:", err)
		log.Printf("Error updating journal entry: %v\n", err)
		http.Error(w, "Failed to update journal entry", http.StatusInternalServerError)
		return
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Journal entry updated successfully",
	})
}
