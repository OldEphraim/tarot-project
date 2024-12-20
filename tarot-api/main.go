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
	godotenv.Load()
	_, lookupErr := os.LookupEnv("OPENAI_API_KEY")
	if !lookupErr {
		log.Fatal("Proper environment variables not set")
	}
	_, lookupErr1 := os.LookupEnv("DB_URL")
	if !lookupErr1 {
		log.Fatal("Proper environment variables not set")
	}
	_, lookupErr2 := os.LookupEnv("JWT_SECRET")
	if !lookupErr2 {
		log.Fatal("Proper environment variables not set")
	}
	_, lookupErr3 := os.LookupEnv("AWS_ACCESS_KEY_ID")
	if !lookupErr3 {
		log.Fatal("Proper environment variables not set")
	}
	_, lookupErr4 := os.LookupEnv("AWS_SECRET_ACCESS_KEY")
	if !lookupErr4 {
		log.Fatal("Proper environment variables not set")
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
	http.HandleFunc("/api/favorites", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.AddToFavoritesHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodPost))
	http.HandleFunc("/api/readings", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.AddToReadingsHandler(w, r, dbQueries, jwtSecret, client)
	}, http.MethodPost))
	http.HandleFunc("/api/favorites/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetFavoritesHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodGet))
	http.HandleFunc("/api/favorites/delete/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.DeleteFavoriteHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodDelete))
	http.HandleFunc("/api/favorites/entry/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetFavoriteByIdHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodGet))
	http.HandleFunc("/api/favorites/journal/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.UpdateJournalEntryHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodPut))
	http.HandleFunc("/api/readings/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetReadingsHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodGet))
	http.HandleFunc("/api/readings/user/{id}/reading/{slug}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetReadingBySlugHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodGet))
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
	http.HandleFunc("/api/users/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.UpdateUserHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodPut))
	http.HandleFunc("/api/users/password/{id}", utils.WrapWithMiddleware(func(w http.ResponseWriter, r *http.Request) {
		handlers.UpdatePasswordHandler(w, r, dbQueries, jwtSecret)
	}, http.MethodPut))

	// Other handlers
	http.HandleFunc("/api/chat", utils.WrapWithMiddleware(handlers.ChatHandler(client), http.MethodPost))
	http.HandleFunc("/api/draw", utils.WrapWithMiddleware(handlers.DrawCardsHandler, http.MethodGet))
	http.HandleFunc("/api/esmeralda/chat", utils.WrapWithMiddleware(handlers.EsmeraldaChatHandler(client), http.MethodPost))
	http.HandleFunc("/api/generate-image", utils.WrapWithMiddleware(handlers.ImageGenerationHandler(rateLimiter, jwtSecret), http.MethodPost))
	http.HandleFunc("/api/get-image-result", utils.WrapWithMiddleware(handlers.GetImageResultHandler(rateLimiter), http.MethodGet))
	http.HandleFunc("/api/get-last-images", utils.WrapWithMiddleware(handlers.GetLastImagesHandler, http.MethodGet))
	http.HandleFunc("/api/search", utils.WrapWithMiddleware(handlers.SearchCardHandler, http.MethodGet))
	http.HandleFunc("/api/tarot-deck", utils.WrapWithMiddleware(handlers.TarotDeckHandler, http.MethodGet))

	log.Println("Starting Tarot API on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
