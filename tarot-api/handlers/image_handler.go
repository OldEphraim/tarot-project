package handlers

import (
	"encoding/json"
	"net/http"
	"tarot-api/services"
)

func ImageGenerationHandler(rl *services.RateLimiter) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Pass the request to the RateLimiter for queued processing
		rl.AddRequest(w, r)
	}
}

func GetImageResultHandler(rl *services.RateLimiter) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Extract requestID from query parameters
		requestID := r.URL.Query().Get("requestID")
		if requestID == "" {
			http.Error(w, "Missing requestID", http.StatusBadRequest)
			return
		}

		// Fetch the image URL from RateLimiter
		imageUrl, exists := rl.GetResult(requestID)
		if !exists {
			http.Error(w, "Image not ready", http.StatusAccepted) // 202 Accepted
			return
		}

		// Send the image URL as JSON response
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"imageUrl": imageUrl})
	}
}
