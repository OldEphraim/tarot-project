package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
)

func UpdateUserHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Manually parse the user ID from the URL path
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 4 || pathParts[3] == "" {
		http.Error(w, "Invalid user ID in URL", http.StatusBadRequest)
		return
	}
	userId := pathParts[3]

	// Verify JWT and extract user information
	tokenString := r.Header.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}
	userID, err := auth.ValidateJWT(tokenString, jwtSecret)
	if err != nil || userID.String() != userId {
		log.Printf("JWT validation failed or user ID mismatch: token error=%v, parsed userID=%v, URL userId=%v\n", err, userID, userId)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Parse request body
	var input struct {
		Email          *string `json:"email,omitempty"`
		Username       *string `json:"username,omitempty"`
		ArtStyle       *string `json:"art_style,omitempty"`
		ProfilePicture *string `json:"profile_picture,omitempty"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Update fields if provided in the input
	if input.Email != nil && *input.Email != "" {
		err := dbQueries.UpdateUserEmail(r.Context(), database.UpdateUserEmailParams{
			ID:    userID,
			Email: *input.Email,
		})
		if err != nil {
			log.Printf("Error updating email: %v\n", err)
			http.Error(w, "Could not update email", http.StatusInternalServerError)
			return
		}
	}

	if input.Username != nil && *input.Username != "" {
		err := dbQueries.UpdateUserUsername(r.Context(), database.UpdateUserUsernameParams{
			ID:       userID,
			Username: *input.Username,
		})
		if err != nil {
			log.Printf("Error updating username: %v\n", err)
			http.Error(w, "Could not update username", http.StatusInternalServerError)
			return
		}
	}

	if input.ArtStyle != nil && *input.ArtStyle != "" {
		err := dbQueries.UpdateUserArtStyle(r.Context(), database.UpdateUserArtStyleParams{
			ID:       userID,
			ArtStyle: sql.NullString{String: *input.ArtStyle, Valid: true},
		})
		if err != nil {
			log.Printf("Error updating art style: %v\n", err)
			http.Error(w, "Could not update art style", http.StatusInternalServerError)
			return
		}
	}

	if input.ProfilePicture != nil && *input.ProfilePicture != "" {
		err := dbQueries.UpdateUserProfilePicture(r.Context(), database.UpdateUserProfilePictureParams{
			ID:             userID,
			ProfilePicture: sql.NullString{String: *input.ProfilePicture, Valid: true},
		})
		if err != nil {
			log.Printf("Error updating profile picture: %v\n", err)
			http.Error(w, "Could not update profile picture", http.StatusInternalServerError)
			return
		}
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User updated successfully",
	})
}
