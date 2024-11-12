package handlers

import (
	"encoding/json"
	"net/http"
	"tarot-api/internal/database"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries) {
	// Get the token directly from the body
	var request struct {
		Username string `json:"username"`
		Token    string `json:"token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil || request.Token == "" {
		respondWithError(w, http.StatusBadRequest, "Invalid or missing token")
		return
	}

	// Delete the refresh token from the database
	err := dbQueries.DeleteRefreshToken(r.Context(), request.Token)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not invalidate token")
		return
	}

	// Update user's logout timestamp
	err = dbQueries.UpdateUserLogoutTimestamp(r.Context(), request.Username)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not update logout timestamp")
		return
	}

	// Return a success message
	respondWithJSON(w, http.StatusOK, map[string]string{
		"message": "Logout successful",
	})
}