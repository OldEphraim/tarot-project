package utils

import "net/http"

func WrapWithMiddleware(handler http.HandlerFunc, allowedMethod string) http.HandlerFunc {
	return CorsMiddleware(
		LoggingMiddleware(
			MethodMiddleware(handler, allowedMethod),
		),
	)
}
