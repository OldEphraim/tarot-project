package handlers

import (
	"encoding/json"
	"net/http"
	"tarot-api/models"
)

// tarotDeckHandler handles requests to get the tarot deck
func TarotDeckHandler(w http.ResponseWriter, r *http.Request) {
	// Set the content type to JSON
	w.Header().Set("Content-Type", "application/json")

	// Encode the tarotDeck variable into JSON and write it to the response
	if err := json.NewEncoder(w).Encode(models.TarotDetails); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
