package utils

import "net/http"

func enableCors(w http.ResponseWriter, r *http.Request) bool {
	allowedOrigins := []string{
		"http://localhost:3000",
		"https://alansarcana.com",
		"https://www.alansarcana.com",
	}

	origin := r.Header.Get("Origin")
	isAllowed := false
	for _, allowedOrigin := range allowedOrigins {
		if origin == allowedOrigin {
			isAllowed = true
			w.Header().Set("Access-Control-Allow-Origin", origin)
			break
		}
	}

	if !isAllowed {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Bad Request: Invalid Origin"))
		return false // Indicate that the response has already been written.
	}

	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	return true
}

// Middleware to enable CORS for all routes
func CorsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !enableCors(w, r) {
			// If CORS validation fails, terminate further processing.
			return
		}

		// Handle OPTIONS request for CORS preflight
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Proceed with the next handler if CORS is valid
		next(w, r)
	}
}
