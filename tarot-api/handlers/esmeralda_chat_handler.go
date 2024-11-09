package handlers

import (
	"encoding/json"
	"net/http"
	"tarot-api/services"

	openai "github.com/sashabaranov/go-openai"
)

// EsmeraldaChatHandler returns a handler function that uses the ChatService for stateful conversations
func EsmeraldaChatHandler(client *openai.Client) http.HandlerFunc {
	// Create an instance of the ChatService for Esmeralda
	chatService := services.EsmeraldaService(client)

	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Message string `json:"message"`
		}

		// Decode the user's message from the request
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Get Esmeralda's response
		response, err := chatService.GetEsmeraldaResponse(req.Message)
		if err != nil {
			http.Error(w, "Failed to get response from Esmeralda", http.StatusInternalServerError)
			return
		}

		// Send Esmeralda's response back to the frontend
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"response": response})
	}
}
