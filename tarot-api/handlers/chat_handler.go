package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	openai "github.com/sashabaranov/go-openai"

	"tarot-api/services"
)

func ChatHandler(client *openai.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Message string `json:"message"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Call the OpenAI service
		response, err := services.GetChatResponse(client, req.Message)
		if err != nil {
			http.Error(w, "Failed to get response from OpenAI", http.StatusInternalServerError)
			log.Printf("Error making OpenAI request: %v\n", err)
			return
		}

		// Send the response back to the frontend
		json.NewEncoder(w).Encode(map[string]string{"response": response})
	}
}
