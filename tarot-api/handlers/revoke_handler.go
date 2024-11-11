package handlers

import (
	"net/http"
	"strings"
	"tarot-api/internal/database"
)

func RevokeHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries) {
	// Extract the refresh token from the Authorization header
	authHeader := r.Header.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		respondWithError(w, http.StatusUnauthorized, "Missing or invalid token")
		return
	}
	tokenString := authHeader[7:] // Remove "Bearer "

	// Revoke the token in the database
	err := dbQueries.RevokeRefreshToken(r.Context(), tokenString)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not revoke token")
		return
	}

	respondWithJSON(w, http.StatusNoContent, nil)
}