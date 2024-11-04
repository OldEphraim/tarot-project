package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	openai "github.com/sashabaranov/go-openai"
)

func chatHandler(client *openai.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Message string `json:"message"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Call the OpenAI service
		response, err := GetChatResponse(client, req.Message)
		if err != nil {
			http.Error(w, "Failed to get response from OpenAI", http.StatusInternalServerError)
			log.Printf("Error making OpenAI request: %v\n", err)
			return
		}

		// Send the response back to the frontend
		json.NewEncoder(w).Encode(map[string]string{"response": response})
	}
}

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
	shuffledDeck := make([]TarotDeck, len(tarotDeck))
	copy(shuffledDeck, tarotDeck)
	rand.Shuffle(len(shuffledDeck), func(i, j int) {
		shuffledDeck[i], shuffledDeck[j] = shuffledDeck[j], shuffledDeck[i]
	})

	// Draw the specified number of cards
	var drawnCards []TarotDeck
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

func imageGenerationHandler(client *openai.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Theme string `json:"theme"`
			Card  string `json:"card"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Call the image generation service
		imageUrl, err := GenerateCardImage(client, req.Theme, req.Card)
		if err != nil {
			http.Error(w, "Failed to generate image", http.StatusInternalServerError)
			log.Printf("Error generating image: %v\n", err)
			return
		}

		// Send the image URL back to the frontend
		json.NewEncoder(w).Encode(map[string]string{"imageUrl": imageUrl})
	}
}

func searchCardHandler(w http.ResponseWriter, r *http.Request) {
	// Default to searching for the fool
	cardName := "fool"

	// Check for a 'cardName' query parameter and update cardName
	cardName = r.URL.Query().Get("cardName")

	// Search for the card in the tarotDeck
	for _, card := range tarotDeck {
		if strings.EqualFold(card.Details.Name, cardName) { // Assuming TarotCard has a Name field
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(card)
			return
		}
	}

	// If not found, return a 404 error
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Card not found"})
}

// tarotDeckHandler handles requests to get the tarot deck
func tarotDeckHandler(w http.ResponseWriter, r *http.Request) {
	// Set the content type to JSON
	w.Header().Set("Content-Type", "application/json")

	// Encode the tarotDeck variable into JSON and write it to the response
	if err := json.NewEncoder(w).Encode(tarotDeck); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
