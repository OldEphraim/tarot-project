package handlers

import (
	"net/http"
	"strings"
	"tarot-api/internal/auth"
	"tarot-api/internal/database"
	"time"
)

func RefreshHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Get the token from the Authorization header
	authHeader := r.Header.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		respondWithError(w, http.StatusUnauthorized, "Missing or invalid token")
		return
	}
	tokenString := authHeader[7:] // Remove "Bearer "

	// Retrieve token details from the database
	refreshToken, err := dbQueries.GetUserFromRefreshToken(r.Context(), tokenString)
	if err != nil || refreshToken.ExpiresAt.Before(time.Now()) {
		respondWithError(w, http.StatusUnauthorized, "Invalid or expired refresh token")
		return
	}

	// Generate new JWT
	expiration := time.Hour
	expirationTime := time.Now().Add(expiration)

	newAccessToken, err := auth.MakeJWT(refreshToken.UserID, string(jwtSecret), expiration)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create token")
		return
	}

	// Send the new access token and expiration time
	respondWithJSON(w, http.StatusOK, map[string]interface{}{
		"token":      newAccessToken,
		"expiration": expirationTime.Format(time.RFC3339), // ISO 8601 format for consistency
	})
}
