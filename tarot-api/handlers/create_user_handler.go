package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"tarot-api/internal/database"

	"golang.org/x/crypto/bcrypt"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries) {
	var input struct {
		Password string `json:"password"`
		Email    string `json:"email"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid input")
		return
	}

	// Hash the password using bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v\n", err)
		respondWithError(w, http.StatusInternalServerError, "Could not hash password")
		return
	}

	// Pass params to the CreateUser function
	params := database.CreateUserParams{
		Email:          input.Email,
		HashedPassword: string(hashedPassword),
	}

	// Create a new user in the database
	newUser, err := dbQueries.CreateUser(r.Context(), params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not create user")
		return
	}

	user := database.User{
		ID:             newUser.ID,
		CreatedAt:      newUser.CreatedAt,
		UpdatedAt:      newUser.UpdatedAt,
		Email:          newUser.Email,
		HashedPassword: newUser.HashedPassword,
	}

	respondWithJSON(w, http.StatusCreated, map[string]interface{}{
		"id":              user.ID,
		"created_at":      user.CreatedAt,
		"updated_at":      user.UpdatedAt,
		"email":           user.Email,
		"hashed_password": user.HashedPassword,
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