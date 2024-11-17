package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
)

func GetReadingsHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte) {
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

    // Retrieve readings from the database
    readings, err := dbQueries.GetReadingsByUser(r.Context(), userID)
    if err != nil {
        log.Printf("Error retrieving readings: %v\n", err)
        http.Error(w, "Could not retrieve readings", http.StatusInternalServerError)
        return
    }

    // Build the response including workflow_log and created_at
    var response []map[string]interface{}
    for _, reading := range readings {
        var decodedLog map[string]interface{}
        if err := json.Unmarshal(reading.WorkflowLog, &decodedLog); err != nil {
            log.Printf("Error decoding workflow log for reading: %v\n", err)
            http.Error(w, "Could not decode workflow log", http.StatusInternalServerError)
            return
        }

        response = append(response, map[string]interface{}{
            "workflow_log":    decodedLog,
            "created_at":      reading.CreatedAt,
			"title":           reading.Title,
			"slug":            reading.Slug,
        })
    }

    // Respond with the readings
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
}
