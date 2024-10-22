package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

func drawCardHandler(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())
	card := tarotDeck[rand.Intn(len(tarotDeck))]

	// Randomly determine whether the card is reversed
	if rand.Intn(2) == 0 {
		card.Description = card.Reversed
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(card)
}

func drawMultipleCardsHandler(w http.ResponseWriter, r *http.Request) {
	// Default to drawing 3 cards
	numCards := 3

	// Check for a 'count' query parameter and update numCards
	countParam := r.URL.Query().Get("count")
	if countParam != "" {
		if count, err := strconv.Atoi(countParam); err == nil && count > 0 && count <= len(tarotDeck) {
			numCards = count
		}
	}

	// Shuffle the deck to prevent duplicates
	rand.Seed(time.Now().UnixNano())
	shuffledDeck := make([]TarotCard, len(tarotDeck))
	copy(shuffledDeck, tarotDeck)
	rand.Shuffle(len(shuffledDeck), func(i, j int) {
		shuffledDeck[i], shuffledDeck[j] = shuffledDeck[j], shuffledDeck[i]
	})

	// Draw the specified number of cards
	var drawnCards []TarotCard
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
