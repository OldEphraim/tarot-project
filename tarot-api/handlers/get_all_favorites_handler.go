package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
)

func GetFavoritesHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
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
		log.Printf("JWT validation failed or user ID mismatch: token error=%v, parsed userID=%v, submitted userID=%v\n", err, userID, userId)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Retrieve favorites from the database
	favorites, err := dbQueries.GetFavoritesByUser(r.Context(), userID)
	if err != nil {
		log.Printf("Error retrieving favorites: %v\n", err)
		http.Error(w, "Could not retrieve favorites", http.StatusInternalServerError)
		return
	}

	// Respond with the favorites
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(favorites)
}
