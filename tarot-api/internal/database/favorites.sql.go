// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: favorites.sql

package database

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const addFavorite = `-- name: AddFavorite :one
INSERT INTO favorites (id, user_id, image_url, card_name, art_style, journal_entry) 
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) 
RETURNING id, user_id, image_url, card_name, art_style, journal_entry, created_at, updated_at
`

type AddFavoriteParams struct {
	UserID       uuid.UUID
	ImageUrl     string
	CardName     string
	ArtStyle     string
	JournalEntry sql.NullString
}

type AddFavoriteRow struct {
	ID           uuid.UUID
	UserID       uuid.UUID
	ImageUrl     string
	CardName     string
	ArtStyle     string
	JournalEntry sql.NullString
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func (q *Queries) AddFavorite(ctx context.Context, arg AddFavoriteParams) (AddFavoriteRow, error) {
	row := q.db.QueryRowContext(ctx, addFavorite,
		arg.UserID,
		arg.ImageUrl,
		arg.CardName,
		arg.ArtStyle,
		arg.JournalEntry,
	)
	var i AddFavoriteRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ImageUrl,
		&i.CardName,
		&i.ArtStyle,
		&i.JournalEntry,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteFavoriteById = `-- name: DeleteFavoriteById :exec
DELETE FROM favorites
WHERE id = $1 AND user_id = $2
`

type DeleteFavoriteByIdParams struct {
	ID     uuid.UUID
	UserID uuid.UUID
}

func (q *Queries) DeleteFavoriteById(ctx context.Context, arg DeleteFavoriteByIdParams) error {
	_, err := q.db.ExecContext(ctx, deleteFavoriteById, arg.ID, arg.UserID)
	return err
}

const getFavoriteById = `-- name: GetFavoriteById :one
SELECT 
    id,
    user_id,
    image_url, 
    card_name, 
    art_style,
    journal_entry,
    created_at,
    updated_at
FROM 
    favorites
WHERE 
    id = $1
`

type GetFavoriteByIdRow struct {
	ID           uuid.UUID
	UserID       uuid.UUID
	ImageUrl     string
	CardName     string
	ArtStyle     string
	JournalEntry sql.NullString
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func (q *Queries) GetFavoriteById(ctx context.Context, id uuid.UUID) (GetFavoriteByIdRow, error) {
	row := q.db.QueryRowContext(ctx, getFavoriteById, id)
	var i GetFavoriteByIdRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ImageUrl,
		&i.CardName,
		&i.ArtStyle,
		&i.JournalEntry,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getFavoritesByUser = `-- name: GetFavoritesByUser :many
SELECT 
    image_url, 
    card_name, 
    art_style,
    journal_entry,
    updated_at,
    id
FROM 
    favorites
WHERE 
    user_id = $1
ORDER BY 
    updated_at DESC
`

type GetFavoritesByUserRow struct {
	ImageUrl     string
	CardName     string
	ArtStyle     string
	JournalEntry sql.NullString
	UpdatedAt    time.Time
	ID           uuid.UUID
}

func (q *Queries) GetFavoritesByUser(ctx context.Context, userID uuid.UUID) ([]GetFavoritesByUserRow, error) {
	rows, err := q.db.QueryContext(ctx, getFavoritesByUser, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetFavoritesByUserRow
	for rows.Next() {
		var i GetFavoritesByUserRow
		if err := rows.Scan(
			&i.ImageUrl,
			&i.CardName,
			&i.ArtStyle,
			&i.JournalEntry,
			&i.UpdatedAt,
			&i.ID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateJournalEntry = `-- name: UpdateJournalEntry :exec
UPDATE favorites
SET 
    journal_entry = $1,
    updated_at = NOW()
WHERE 
    id = $2 AND user_id = $3
`

type UpdateJournalEntryParams struct {
	JournalEntry sql.NullString
	ID           uuid.UUID
	UserID       uuid.UUID
}

func (q *Queries) UpdateJournalEntry(ctx context.Context, arg UpdateJournalEntryParams) error {
	_, err := q.db.ExecContext(ctx, updateJournalEntry, arg.JournalEntry, arg.ID, arg.UserID)
	return err
}
