package services

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"sync"
	"time"

	openai "github.com/sashabaranov/go-openai"
)

// Struct for tracking request timestamps
type RateLimiter struct {
	client     *openai.Client
	requests   chan requestPayload
	results    map[string]string // Stores requestID to imageURL mapping
	mu         sync.Mutex        // Mutex to protect access to results map
	processing sync.WaitGroup
}

type requestPayload struct {
	RequestID string
	Theme     string
	Card      string
}

func NewRateLimiter(client *openai.Client) *RateLimiter {
	rl := &RateLimiter{
		client:   client,
		requests: make(chan requestPayload, 100),
		results:  make(map[string]string),
	}

	go rl.startProcessing()
	return rl
}

func (rl *RateLimiter) startProcessing() {
	ticker := time.NewTicker(time.Minute / 5)
	defer ticker.Stop()

	for req := range rl.requests {
		<-ticker.C
		rl.processRequest(req)
	}
}

func (rl *RateLimiter) processRequest(req requestPayload) {
	// Generate the image URL
	imageUrl, err := GenerateCardImage(rl.client, req.Theme, req.Card)
	if err != nil {
		log.Printf("Error generating image for request %s: %v\n", req.RequestID, err)
		rl.storeResult(req.RequestID, "Error generating image.")
		return
	}

	// Store the result for the requestID
	rl.storeResult(req.RequestID, imageUrl)
}

// storeResult safely stores the image URL result
func (rl *RateLimiter) storeResult(requestID, imageUrl string) {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	rl.results[requestID] = imageUrl
}

// GetResult fetches the generated image URL by requestID
func (rl *RateLimiter) GetResult(requestID string) (string, bool) {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	url, exists := rl.results[requestID]
	return url, exists
}

// AddRequest adds a new request to the queue and returns a unique requestID
func (rl *RateLimiter) AddRequest(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Theme string `json:"theme"`
		Card  string `json:"card"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Generate a unique requestID
	requestID := strconv.Itoa(rand.Int())
	rl.processing.Add(1)
	rl.requests <- requestPayload{
		RequestID: requestID,
		Theme:     req.Theme,
		Card:      req.Card,
	}

	// Return the requestID to the client
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"requestID": requestID})
}
