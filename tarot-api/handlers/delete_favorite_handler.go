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

func DeleteFavoriteHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Log the received request
	log.Printf("Received request: %s %s\n", r.Method, r.URL.Path)

	// Extract favorite ID from the URL
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 5 || pathParts[4] == "" {
		log.Println("Invalid favorite ID in URL:", pathParts[3], pathParts[4])
		http.Error(w, "Invalid favorite ID in URL", http.StatusBadRequest)
		return
	}
	favoriteID, err := uuid.Parse(pathParts[4])
	if err != nil {
		log.Printf("Invalid UUID format for favorite ID: %v\n", err)
		http.Error(w, "Invalid favorite ID format", http.StatusBadRequest)
		return
	}
	log.Printf("Parsed favorite ID: %s\n", favoriteID)

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
	log.Printf("Authenticated user ID: %s\n", userID)

	// Execute delete query
	log.Printf("Attempting to delete favorite with ID %s for user ID %s\n", favoriteID, userID)
	err = dbQueries.DeleteFavoriteById(r.Context(), database.DeleteFavoriteByIdParams{
		ID:     favoriteID,
		UserID: userID,
	})
	if err != nil {
		log.Printf("Error deleting favorite: %v\n", err)
		http.Error(w, "Failed to delete favorite", http.StatusInternalServerError)
		return
	}

	// Log success and respond
	log.Printf("Successfully deleted favorite with ID %s for user ID %s\n", favoriteID, userID)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Favorite deleted successfully",
	})
}
