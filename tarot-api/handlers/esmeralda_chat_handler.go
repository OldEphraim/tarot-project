package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"tarot-api/models"
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

		// Check response for tarot card mentions
		matchedCards := findMentionedCards(response)

		// Construct the JSON response
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"response": response,
			"cards":    matchedCards,
		})
	}
}

// findMentionedCards scans the response for tarot card names with Levenshtein distance of 1 or less
func findMentionedCards(response string) []models.TarotDeck {
	var mentionedCards []models.TarotDeck
	responseLower := strings.ToLower(response)

	for _, card := range models.TarotDetails {
		cardNameLower := strings.ToLower(card.Name)
		if strings.Contains(responseLower, cardNameLower) || levenshteinDistance(responseLower, cardNameLower) <= 1 {
			mentionedCards = append(mentionedCards, card)
		}
	}

	return mentionedCards
}

// levenshteinDistance calculates the Levenshtein distance between two strings
func levenshteinDistance(a, b string) int {
	if len(a) < len(b) {
		a, b = b, a
	}

	previousRow := make([]int, len(b)+1)
	for i := range previousRow {
		previousRow[i] = i
	}

	for i, ai := range a {
		currentRow := make([]int, len(b)+1)
		currentRow[0] = i + 1
		for j, bj := range b {
			insertions := previousRow[j+1] + 1
			deletions := currentRow[j] + 1
			substitutions := previousRow[j]
			if ai != bj {
				substitutions++
			}
			currentRow[j+1] = min(insertions, deletions, substitutions)
		}
		previousRow = currentRow
	}
	return previousRow[len(b)]
}

// min returns the smallest of a, b, or c
func min(a, b, c int) int {
	if a < b {
		if a < c {
			return a
		}
		return c
	}
	if b < c {
		return b
	}
	return c
}
