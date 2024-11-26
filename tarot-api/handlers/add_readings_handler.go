package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	openai "github.com/sashabaranov/go-openai"

	"tarot-api/internal/auth"
	"tarot-api/internal/database"
	"tarot-api/services"

	"github.com/google/uuid"
)

func AddToReadingsHandler(w http.ResponseWriter, r *http.Request, dbQueries *database.Queries, jwtSecret []byte, client *openai.Client) {
	// Parse request body
	var input struct {
		UserID       uuid.UUID              `json:"user_id"`
		WorkflowData map[string]interface{} `json:"workflow_data"` 
	}

	log.Printf("Workflow data received: %+v\n", input.WorkflowData)

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Verify JWT and extract user information
	tokenString := r.Header.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}
	userID, err := auth.ValidateJWT(tokenString, jwtSecret)
	if err != nil || userID != input.UserID {
		log.Printf("JWT validation failed or user ID mismatch: token error=%v, parsed userID=%v, submitted userId=%v\n", err, userID, input.UserID)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Convert the WorkflowData map to JSON
	workflowJSON, err := json.Marshal(input.WorkflowData)
	log.Println(workflowJSON)
	if err != nil {
		log.Printf("Error marshaling workflow data: %v\n", err)
		http.Error(w, "Invalid workflow data", http.StatusBadRequest)
		return
	}

	// Generate a title for the reading using OpenAI
	var userReason, messages string
	if input.WorkflowData["workflow"] == "cards" {
		// Extract userReason and explanations for cards workflow
		if reason, ok := input.WorkflowData["userReason"].(string); ok {
			userReason = reason
		}
		if explanations, ok := input.WorkflowData["explanations"].([]interface{}); ok {
			for _, explanation := range explanations {
				if text, ok := explanation.(string); ok {
					messages += text + " "
				}
			}
		}
	} else if input.WorkflowData["workflow"] == "fortuneteller" {
		// Extract all messages for fortuneteller workflow
		if messagesList, ok := input.WorkflowData["messages"].([]interface{}); ok {
			for _, msg := range messagesList {
				if messageMap, ok := msg.(map[string]interface{}); ok {
					if userMsg, ok := messageMap["user"].(string); ok {
						messages += userMsg + " "
					}
					if esmeraldaMsg, ok := messageMap["esmeralda"].(map[string]interface{}); ok {
						if text, ok := esmeraldaMsg["text"].(string); ok {
							messages += text + " "
						}
					}
				}
			}
		}
	}

	titlePrompt := "Create a concise and descriptive title for the following tarot reading content:\n\n"
	readingContent := userReason + messages
	title, err := services.GetChatResponse(client, titlePrompt+readingContent)
	if err != nil {
		log.Printf("Error generating title: %v\n", err)
		http.Error(w, "Could not generate title", http.StatusInternalServerError)
		return
	}

	// Process the title
	processedTitle := title
	processedTitle = strings.TrimPrefix(processedTitle, "Title: ")
	processedTitle = strings.ReplaceAll(processedTitle, "\"", "")
	if colonIndex := strings.Index(processedTitle, ":"); colonIndex != -1 {
		processedTitle = processedTitle[:colonIndex]
	}
	processedTitle = strings.TrimSpace(processedTitle)

	// Generate slug from the processed title
	slug := strings.ToLower(processedTitle)
	slug = strings.ReplaceAll(slug, " ", "-")
	slug = strings.ReplaceAll(slug, "--", "-")
	slug = strings.Trim(strings.TrimSpace(slug), "-")

	// Add the reading to the database
	err = dbQueries.AddReading(r.Context(), database.AddReadingParams{
		UserID:      userID,
		WorkflowLog: workflowJSON,
		Title:       processedTitle,
		Slug:        slug,
	})
	if err != nil {
		log.Printf("Error adding to readings: %v\n", err)
		http.Error(w, "Could not add reading", http.StatusInternalServerError)
		return
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Log added to readings",
	})
}
