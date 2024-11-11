package handlers

import (
	"net/http"
	"strings"
	"tarot-api/internal/auth"
	"tarot-api/internal/database"
	"time"
)

func RefreshHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Extract the refresh token from the Authorization header
	authHeader := r.Header.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		respondWithError(w, http.StatusUnauthorized, "Missing or invalid token")
		return
	}
	tokenString := authHeader[7:] // Remove "Bearer "

	// Retrieve the refresh token details from the database
	refreshToken, err := dbQueries.GetUserFromRefreshToken(r.Context(), tokenString)
	if err != nil || refreshToken.ExpiresAt.Before(time.Now()) {
		respondWithError(w, http.StatusUnauthorized, "Invalid or expired refresh token")
		return
	}

	// Set default expiration time
	expiration := 1 * time.Hour

	// Create a JWT token
	newAccessToken, err := auth.MakeJWT(refreshToken.UserID, string(jwtSecret), expiration)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create token")
		return
	}

	respondWithJSON(w, http.StatusOK, map[string]interface{}{
		"token": newAccessToken,
	})
}
