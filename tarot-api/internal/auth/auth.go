package auth

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

// CheckPasswordHash compares a password with a hash
func CheckPasswordHash(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

// MakeJWT creates a new JWT token for the user.
func MakeJWT(userID uuid.UUID, tokenSecret string, expiresIn time.Duration) (string, error) {
	claims := &jwt.RegisteredClaims{
		Issuer:    "fortuneteller_admin",
		IssuedAt:  jwt.NewNumericDate(time.Now().UTC()),
		ExpiresAt: jwt.NewNumericDate(time.Now().UTC().Add(expiresIn)),
		Subject:   userID.String(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(tokenSecret))
}

var ErrInvalidToken = errors.New("invalid token")

// ValidateJWT validates the given token string and returns the user ID if valid.
func ValidateJWT(tokenString string, tokenSecret []byte) (uuid.UUID, error) {
	// Parse the token
	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Ensure the signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.NewValidationError("invalid signing method", jwt.ValidationErrorMalformed)
		}
		return tokenSecret, nil
	})

	if err != nil || !token.Valid {
		return uuid.Nil, ErrInvalidToken
	}

	// Extract and verify claims
	claims, ok := token.Claims.(*jwt.RegisteredClaims)
	if !ok {
		return uuid.Nil, jwt.NewValidationError("invalid claims", jwt.ValidationErrorClaimsInvalid)
	}

	// Parse the subject (user ID) as UUID
	userID, err := uuid.Parse(claims.Subject)
	if err != nil {
		return uuid.Nil, jwt.NewValidationError("invalid subject in token claims", jwt.ValidationErrorClaimsInvalid)
	}

	return userID, nil
}

func MakeRefreshToken() (string, error) {
	token := make([]byte, 32) // 256 bits
	_, err := rand.Read(token)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(token), nil
}