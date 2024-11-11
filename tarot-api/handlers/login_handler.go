package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
)

func LoginHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	type request struct {
		Email            string `json:"email"`
		Password         string `json:"password"`
		ExpiresInSeconds *int   `json:"expires_in_seconds,omitempty"`
	}

	var req request
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user, err := dbQueries.GetUserByEmail(r.Context(), req.Email)
	if err != nil {
		http.Error(w, "Incorrect email or password", http.StatusUnauthorized)
		return
	}

	if err := auth.CheckPasswordHash(req.Password, user.HashedPassword); err != nil {
		http.Error(w, "Incorrect email or password", http.StatusUnauthorized)
		return
	}

	// Set default expiration time
	expiration := 1 * time.Hour
	if req.ExpiresInSeconds != nil {
		if *req.ExpiresInSeconds > 3600 {
			expiration = 1 * time.Hour
		} else {
			expiration = time.Duration(*req.ExpiresInSeconds) * time.Second
		}
	}

	// Create a JWT token
	accessToken, err := auth.MakeJWT(user.ID, string(jwtSecret), expiration)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create token")
		return
	}

	// Create a refresh token
	refreshToken, err := auth.MakeRefreshToken()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create refresh token")
		return
	}

	// Save the refresh token to the database with expiration
	expiresAt := time.Now().Add(60 * 24 * time.Hour) // 60 days from now
	_, err = dbQueries.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: expiresAt,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not save refresh token")
		return
	}

	respondWithJSON(w, http.StatusOK, map[string]interface{}{
		"id":            user.ID,
		"created_at":    time.Now(),
		"updated_at":    time.Now(),
		"email":         req.Email,
		"token":         accessToken,
		"refresh_token": refreshToken,
	})
}
