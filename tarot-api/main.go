package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"tarot-api/handlers"
	"tarot-api/internal/database"
	"tarot-api/services"
	"tarot-api/utils"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	openai "github.com/sashabaranov/go-openai"
)

// apiConfig holds in-memory state
type apiConfig struct {
	dbQueries      *database.Queries
}

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

	dbURL := os.Getenv("DB_URL")
	db, dbErr := sql.Open("postgres", dbURL)
	if dbErr != nil {
		log.Fatalf("Failed to connect to database: %v", dbErr)
	}

	dbQueries := database.New(db)

	// Initialize apiConfig
	apiCfg := &apiConfig{
		dbQueries: dbQueries,
	}

	apiKey := os.Getenv("OPENAI_API_KEY")
	client := openai.NewClient(apiKey)
	rateLimiter := services.NewRateLimiter(client)

	// dbQueries handlers
	http.HandleFunc("/api/users", utils.CorsMiddleware(loggingMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.CreateUserHandler(w, r, apiCfg.dbQueries)
	})))

	// Other handlers
	http.HandleFunc("/api/chat", utils.CorsMiddleware(loggingMiddleware(handlers.ChatHandler(client))))
	http.HandleFunc("/api/draw", utils.CorsMiddleware(loggingMiddleware(handlers.DrawCardsHandler)))
	http.HandleFunc("/api/esmeralda/chat", utils.CorsMiddleware(loggingMiddleware(handlers.EsmeraldaChatHandler(client))))
	http.HandleFunc("/api/generate-image", utils.CorsMiddleware(loggingMiddleware(handlers.ImageGenerationHandler(rateLimiter))))
	http.HandleFunc("/api/get-image-result", utils.CorsMiddleware(loggingMiddleware(handlers.GetImageResultHandler(rateLimiter))))
	http.HandleFunc("/api/search", utils.CorsMiddleware(loggingMiddleware(handlers.SearchCardHandler)))
	http.HandleFunc("/api/tarot-deck", utils.CorsMiddleware(loggingMiddleware(handlers.TarotDeckHandler)))

	log.Println("Starting Tarot API on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
