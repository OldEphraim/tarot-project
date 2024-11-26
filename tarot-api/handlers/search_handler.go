package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"tarot-api/models"
)

func SearchCardHandler(w http.ResponseWriter, r *http.Request) {
	// Default to searching for the fool
	cardName := "fool"

	// Check for a 'cardName' query parameter and update cardName
	cardName = r.URL.Query().Get("cardName")

	// Search for the card in the tarotDeck
	for _, card := range models.TarotDetails {
		if strings.EqualFold(card.Details.Name, cardName) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(card)
			return
		}
	}

	// If not found, return a 404 error
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Card not found"})
}
