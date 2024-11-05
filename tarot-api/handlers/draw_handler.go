package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"tarot-api/models"
)

func DrawCardsHandler(w http.ResponseWriter, r *http.Request) {
	// Default to drawing 3 cards
	numCards := 3

	// Check for a 'count' query parameter and update numCards
	countParam := r.URL.Query().Get("count")
	if countParam != "" {
		if count, err := strconv.Atoi(countParam); err == nil && count > 0 && count <= len(models.TarotDetails) {
			numCards = count
		}
	}

	rand.Seed(time.Now().UnixNano())
	cardCount := len(models.TarotDetails)
	drawnIndices := make(map[int]bool) // Track selected card indices to prevent duplicates
	var drawnCards []models.TarotDeck

	for len(drawnCards) < numCards {
		randomIndex := rand.Intn(cardCount)
		if drawnIndices[randomIndex] {
			continue // Skip if the card has already been drawn
		}
		drawnIndices[randomIndex] = true

		// Select the card
		card := models.TarotDetails[randomIndex]

		// Set the card as reversed 1 in 8 times
		if rand.Intn(8) == 0 {
			card.Description = card.Reversed
		}

		// Append the drawn card to the result
		drawnCards = append(drawnCards, card)
	}

	// Return the drawn cards as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(drawnCards)
}
