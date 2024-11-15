package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"

	"github.com/google/uuid"
)

func LoginHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	type request struct {
		Username         string `json:"username"`
		Password         string `json:"password"`
		ExpiresInSeconds *int   `json:"expires_in_seconds,omitempty"`
	}

	var req request
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Retrieve user by username
	user, err := dbQueries.GetUserByUsername(r.Context(), req.Username)
	if err != nil {
		log.Println("Username does not exist")
		respondWithError(w, http.StatusUnauthorized, "Incorrect username or password")
		return
	}

	// Verify password
	if err := auth.CheckPasswordHash(req.Password, user.HashedPassword); err != nil {
		log.Println("Password was not correct")
		log.Printf("bcrypt error: %v", err)
		respondWithError(w, http.StatusUnauthorized, "Incorrect username or password")
		return
	}

	// Define JWT expiration
	expiration := time.Hour
	if req.ExpiresInSeconds != nil && *req.ExpiresInSeconds <= 3600 {
		expiration = time.Duration(*req.ExpiresInSeconds) * time.Second
	}

	// Generate JWT
	accessToken, err := auth.MakeJWT(user.ID, string(jwtSecret), expiration)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create token")
		return
	}

	// Generate and save refresh token
	refreshToken, err := auth.MakeRefreshToken()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create refresh token")
		return
	}

	expiresAt := time.Now().Add(60 * 24 * time.Hour)
	_, err = dbQueries.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: expiresAt,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not save refresh token")
		return
	}

	// Helper function to handle sql.NullString conversion
	toPointer := func(ns sql.NullString) *string {
		if ns.Valid {
			return &ns.String
		}
		return nil
	}

	type loginResponse struct {
		ID             uuid.UUID  `json:"id"`
		Email          string     `json:"email"`
		ArtStyle       *string    `json:"art_style"`
		ProfilePicture *string    `json:"profile_picture"`
		Username       string     `json:"username"`
		Token          string     `json:"token"`
		RefreshToken   string     `json:"refresh_token"`
	}

	respondWithJSON(w, http.StatusOK, loginResponse{
		ID:             user.ID,
		Email: 		    user.Email,
		ArtStyle:       toPointer(user.ArtStyle),
		ProfilePicture: toPointer(user.ProfilePicture),
		Username:       user.Username,
		Token:          accessToken,
		RefreshToken:   refreshToken,
	})
}
