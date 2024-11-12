package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries) {
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Email    string `json:"email"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid input")
		return
	}

	// Check if username is already taken
	usernameTaken, err := dbQueries.CheckUsernameExists(r.Context(), input.Username)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not check username")
		return
	}
	if usernameTaken {
		respondWithError(w, http.StatusConflict, "Username is already taken")
		return
	}

	// Check if email is already taken
	emailTaken, err := dbQueries.CheckEmailExists(r.Context(), input.Email)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not check email")
		return
	}
	if emailTaken {
		respondWithError(w, http.StatusConflict, "Email is already taken")
		return
	}

	// Hash the password using bcrypt
	hashedPassword, err := auth.HashPassword(input.Password)
	if err != nil {
		log.Printf("Error hashing password: %v\n", err)
		respondWithError(w, http.StatusInternalServerError, "Could not hash password")
		return
	}

	// Pass params to the CreateUser function
	params := database.CreateUserParams{
		Username:       input.Username,
		Email:          input.Email,
		HashedPassword: string(hashedPassword),
	}

	// Create a new user in the database
	newUser, err := dbQueries.CreateUser(r.Context(), params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create user")
		return
	}

	respondWithJSON(w, http.StatusCreated, map[string]interface{}{
		"id":              newUser.ID,
		"username":        newUser.Username,
		"created_at":      newUser.CreatedAt,
		"updated_at":      newUser.UpdatedAt,
		"email":           newUser.Email,
	})
}

// Helper function to respond with error messages
func respondWithError(w http.ResponseWriter, code int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

// Helper function to respond with JSON payloads
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}