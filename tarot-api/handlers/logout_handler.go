package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"tarot-api/internal/database"

	"github.com/google/uuid"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries) {
	// Get the token and username from the body
	var request struct {
		Id    uuid.UUID `json:"user_id"`
		Token string    `json:"token,omitempty"`
	}
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid or missing input")
		return
	}

	// Attempt to delete the specific refresh token (if provided)
	if request.Token != "" {
		err := dbQueries.DeleteRefreshToken(r.Context(), request.Token)
		if err != nil {
			log.Printf("Warning: Could not invalidate specific token: %v\n", err)
		}
	}

	// Delete all refresh tokens for the user
	err := dbQueries.DeleteRefreshTokensFromUser(r.Context(), request.Id)
	if err != nil {
		log.Printf("Warning: Could not delete all tokens for user %s: %v\n", request.Id, err)
	}

	// Update the user's logout timestamp
	err = dbQueries.UpdateUserLogoutTimestamp(r.Context(), request.Id)
	if err != nil {
		log.Printf("Warning: Could not update logout timestamp for user %s: %v\n", request.Id, err)
	}

	// Return a success message
	respondWithJSON(w, http.StatusOK, map[string]string{
		"message": "Logout successful",
	})
}
