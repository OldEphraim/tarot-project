package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"tarot-api/config"
	"tarot-api/handlers"
	"tarot-api/internal/database"
	"tarot-api/services"
	"tarot-api/utils"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	openai "github.com/sashabaranov/go-openai"
)

func main() {
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	config.InitAWS()

	dbURL := os.Getenv("DB_URL")
	db, dbErr := sql.Open("postgres", dbURL)
	if dbErr != nil {
		log.Fatalf("Failed to connect to database: %v", dbErr)
	}

	dbQueries := database.New(db)
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	apiKey := os.Getenv("OPENAI_API_KEY")
	client := openai.NewClient(apiKey)
	rateLimiter := services.NewRateLimiter(client)

	// dbQueries handlers
	http.HandleFunc("/api/login", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.LoginHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodPost))
	http.HandleFunc("/api/logout", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.LogoutHandler(w, r, dbQueries)
	}, http.MethodPost))
	http.HandleFunc("/api/refresh", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.RefreshHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodPost))
	http.HandleFunc("/api/users", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.CreateUserHandler(w, r, dbQueries)
	}, http.MethodPost))

	// Other handlers
	http.HandleFunc("/api/chat", utils.WrapWithMiddleware(handlers.ChatHandler(client), http.MethodPost))
	http.HandleFunc("/api/draw", utils.WrapWithMiddleware(handlers.DrawCardsHandler, http.MethodGet))
	http.HandleFunc("/api/esmeralda/chat", utils.WrapWithMiddleware(handlers.EsmeraldaChatHandler(client), http.MethodPost))
	http.HandleFunc("/api/generate-image", utils.WrapWithMiddleware(handlers.ImageGenerationHandler(rateLimiter), http.MethodPost))
	http.HandleFunc("/api/get-image-result", utils.WrapWithMiddleware(handlers.GetImageResultHandler(rateLimiter), http.MethodGet))
	http.HandleFunc("/api/search", utils.WrapWithMiddleware(handlers.SearchCardHandler, http.MethodGet))
	http.HandleFunc("/api/tarot-deck", utils.WrapWithMiddleware(handlers.TarotDeckHandler, http.MethodGet))

	log.Println("Starting Tarot API on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
