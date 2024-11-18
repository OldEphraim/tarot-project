package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
)

func GetReadingBySlugHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
    // Extract user ID and slug from the URL path
    pathParts := strings.Split(r.URL.Path, "/")
    if len(pathParts) < 7 || pathParts[4] == "" || pathParts[6] == "" {
        http.Error(w, "Invalid user ID or slug in URL", http.StatusBadRequest)
        return
    }
    userIDParam := pathParts[4]
    slug := pathParts[6]

	// Verify JWT and extract user information
	tokenString := r.Header.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}
	userID, err := auth.ValidateJWT(tokenString, jwtSecret)
	if err != nil || userID.String() != userIDParam {
		log.Printf("JWT validation failed or user ID mismatch: token error=%v, parsed userID=%v, submitted userID=%v\n", err, userID, userIDParam)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Fetch reading using slug and userID
	reading, err := dbQueries.GetReadingBySlugAndUser(r.Context(), database.GetReadingBySlugAndUserParams{
		Slug:   slug,
		UserID: userID,
	})
	if err != nil {
		log.Printf("Error retrieving reading: %v\n", err)
		http.Error(w, "Reading not found", http.StatusNotFound)
		return
	}

	// Decode workflow log
	var decodedLog map[string]interface{}
	if err := json.Unmarshal(reading.WorkflowLog, &decodedLog); err != nil {
		log.Printf("Error decoding workflow log: %v\n", err)
		http.Error(w, "Could not decode workflow log", http.StatusInternalServerError)
		return
	}

	// Respond with the reading
	response := map[string]interface{}{
		"workflow_log": decodedLog,
		"title":        reading.Title,
		"created_at":   reading.CreatedAt,
		"slug":         reading.Slug,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
