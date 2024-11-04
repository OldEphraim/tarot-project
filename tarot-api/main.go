package main

import (
	"log"
	"net/http"
	"os"
	"tarot-api/handlers"
	"tarot-api/services"
	"tarot-api/utils"

	"github.com/joho/godotenv"
	openai "github.com/sashabaranov/go-openai"
)

// Middleware to log incoming requests
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s", r.Method, r.URL.Path)
		next(w, r)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	apiKey := os.Getenv("OPENAI_API_KEY")
	client := openai.NewClient(apiKey)
	rateLimiter := services.NewRateLimiter(client)

	http.HandleFunc("/api/chat", utils.CorsMiddleware(loggingMiddleware(handlers.ChatHandler(client))))
	http.HandleFunc("/api/draw", utils.CorsMiddleware(loggingMiddleware(handlers.DrawCardsHandler)))
	http.HandleFunc("/api/generate-image", utils.CorsMiddleware(loggingMiddleware(handlers.ImageGenerationHandler(rateLimiter))))
	http.HandleFunc("/api/get-image-result", utils.CorsMiddleware(loggingMiddleware(handlers.GetImageResultHandler(rateLimiter))))
	http.HandleFunc("/api/search", utils.CorsMiddleware(loggingMiddleware(handlers.SearchCardHandler)))
	http.HandleFunc("/api/tarot-deck", utils.CorsMiddleware(loggingMiddleware(handlers.TarotDeckHandler)))

	log.Println("Starting Tarot API on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
