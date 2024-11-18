// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package database

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type Favorite struct {
	ID           uuid.UUID
	UserID       uuid.UUID
	ImageUrl     string
	CreatedAt    time.Time
	UpdatedAt    time.Time
	CardName     string
	ArtStyle     string
	JournalEntry sql.NullString
}

type Reading struct {
	ID          uuid.UUID
	UserID      uuid.UUID
	CreatedAt   time.Time
	WorkflowLog json.RawMessage
	Title       string
	Slug        string
}

type RefreshToken struct {
	Token     string
	CreatedAt time.Time
	UpdatedAt time.Time
	UserID    uuid.UUID
	ExpiresAt time.Time
	RevokedAt sql.NullTime
}

type User struct {
	ID             uuid.UUID
	Username       string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	Email          string
	HashedPassword string
	ArtStyle       sql.NullString
	ProfilePicture sql.NullString
}
