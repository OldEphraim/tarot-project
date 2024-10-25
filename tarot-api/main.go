package main

import (
	"log"
	"net/http"
)

// Enable CORS for the response
func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// Middleware to log incoming requests
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s", r.Method, r.URL.Path)
		next(w, r)
	}
}

// Middleware to enable CORS for all routes
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		// Handle OPTIONS request for CORS preflight
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func main() {
	http.HandleFunc("/api/draw", corsMiddleware(loggingMiddleware(drawCardHandler)))
	http.HandleFunc("/api/draw-multiple", corsMiddleware(loggingMiddleware(drawMultipleCardsHandler)))
	http.HandleFunc("/api/search", corsMiddleware(loggingMiddleware(searchCardHandler)))

	log.Println("Starting Tarot API on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
