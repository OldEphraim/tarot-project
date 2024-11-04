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

	// Shuffle the deck to prevent duplicates
	rand.Seed(time.Now().UnixNano())
	shuffledDeck := make([]models.TarotDeck, len(models.TarotDetails))
	copy(shuffledDeck, models.TarotDetails)
	rand.Shuffle(len(shuffledDeck), func(i, j int) {
		shuffledDeck[i], shuffledDeck[j] = shuffledDeck[j], shuffledDeck[i]
	})

	// Draw the specified number of cards
	var drawnCards []models.TarotDeck
	for i := 0; i < numCards; i++ {
		card := shuffledDeck[i]
		// Randomly choose upright or reversed
		if rand.Intn(2) == 0 {
			card.Description = card.Reversed
		}
		drawnCards = append(drawnCards, card)
	}

	// Return the drawn cards as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(drawnCards)
}
