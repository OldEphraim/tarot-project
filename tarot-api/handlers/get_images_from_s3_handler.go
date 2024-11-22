package handlers

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"tarot-api/services"
	"time"
)

func GetLastImagesHandler(w http.ResponseWriter, r *http.Request) {
	bucketName := "tarot-project-bucket"
	prefix := "images/"
	maxResults := 10 // Default to 10

	// Parse maxResults from the URL if provided
	if queryLimit := r.URL.Query().Get("limit"); queryLimit != "" {
		if limit, err := strconv.Atoi(queryLimit); err == nil {
			maxResults = limit
		}
	}

	// Fetch recent images from S3
	recentImages, err := services.GetRecentImagesFromS3(bucketName, prefix, 100) // Fetch up to 100 initially
	if err != nil {
		log.Println("Error retrieving recent images:", err)
		http.Error(w, "Failed to retrieve recent images", http.StatusInternalServerError)
		return
	}

	// Shuffle the recentImages array to randomize order
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(recentImages), func(i, j int) {
		recentImages[i], recentImages[j] = recentImages[j], recentImages[i]
	})

	// Regex to extract cardName and artStyle
	regex := regexp.MustCompile(`images\/([^\/]+?)-([^\/]+?)-`)

	// Create unique results map
	results := []map[string]string{}
	cardNames := make(map[string]bool)
	artStyles := make(map[string]bool)

	// Process the image URLs for unique entries
	for _, url := range recentImages {
		matches := regex.FindStringSubmatch(url)
		if len(matches) != 3 {
			continue // Skip if the regex doesn't match
		}
		// Extract and format cardName and artStyle
		cardName := strings.ReplaceAll(matches[1], "_", " ")
		artStyle := strings.ReplaceAll(matches[2], "_", " ")

		// Skip duplicates
		if cardNames[cardName] || artStyles[artStyle] {
			continue
		}

		// Add to results
		results = append(results, map[string]string{
			"cardName": cardName,
			"artStyle": artStyle,
			"url":      url,
		})

		// Mark as used
		cardNames[cardName] = true
		artStyles[artStyle] = true

		// Stop if we've reached the limit
		if len(results) >= maxResults {
			break
		}
	}

	// Backfill from the end of the queue if needed
	if len(results) < maxResults {
		for i := len(recentImages) - 1; i >= 0 && len(results) < maxResults; i-- {
			url := recentImages[i]
			matches := regex.FindStringSubmatch(url)
			if len(matches) != 3 {
				continue // Skip if the regex doesn't match
			}
			// Extract and format cardName and artStyle
			cardName := strings.ReplaceAll(matches[1], "_", " ")
			artStyle := strings.ReplaceAll(matches[2], "_", " ")

			// Add to results without checking for uniqueness
			results = append(results, map[string]string{
				"cardName": cardName,
				"artStyle": artStyle,
				"url":      url,
			})
		}
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")

	// Encode and send JSON response
	if err := json.NewEncoder(w).Encode(results); err != nil {
		log.Println("Error encoding JSON response:", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
