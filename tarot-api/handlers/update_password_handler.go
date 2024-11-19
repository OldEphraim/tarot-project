package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"

	"golang.org/x/crypto/bcrypt"
)

func UpdatePasswordHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
	// Parse the user ID from the URL path
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 5 || pathParts[4] == "" {
		http.Error(w, "Invalid user ID in URL", http.StatusBadRequest)
		return
	}
	userId := pathParts[4]

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

	// Parse the request body
	var input struct {
		CurrentPassword string `json:"current_password"`
		NewPassword     string `json:"new_password"`
		ConfirmPassword string `json:"confirm_password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate passwords
	if input.NewPassword != input.ConfirmPassword {
		http.Error(w, "New password and confirmation do not match", http.StatusBadRequest)
		return
	}

	// Retrieve the user's hashed password from the database
	user, err := dbQueries.GetUserByID(r.Context(), userID)
	if err != nil {
		log.Printf("Error fetching user: %v\n", err)
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Compare the provided current password with the stored hash
	if err := bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(input.CurrentPassword)); err != nil {
		log.Printf("Current password does not match for user ID: %v\n", userID)
		http.Error(w, "Current password is incorrect", http.StatusUnauthorized)
		return
	}

	// Hash the new password
	hashedPassword, err := auth.HashPassword(input.NewPassword)
	if err != nil {
		log.Printf("Error hashing new password: %v\n", err)
		http.Error(w, "Could not hash new password", http.StatusInternalServerError)
		return
	}

	// Update the password in the database
	err = dbQueries.UpdateUserPassword(r.Context(), database.UpdateUserPasswordParams{
		ID:             userID,
		HashedPassword: string(hashedPassword),
	})
	if err != nil {
		log.Printf("Error updating password: %v\n", err)
		http.Error(w, "Could not update password", http.StatusInternalServerError)
		return
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Password updated successfully",
	})
}
