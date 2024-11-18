// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: readings.sql

package database

import (
	"context"
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

const addReading = `-- name: AddReading :exec
INSERT INTO readings (user_id, workflow_log, title, slug) VALUES ($1, $2, $3, $4)
`

type AddReadingParams struct {
	UserID      uuid.UUID
	WorkflowLog json.RawMessage
	Title       string
	Slug        string
}

func (q *Queries) AddReading(ctx context.Context, arg AddReadingParams) error {
	_, err := q.db.ExecContext(ctx, addReading,
		arg.UserID,
		arg.WorkflowLog,
		arg.Title,
		arg.Slug,
	)
	return err
}

const getReadingBySlugAndUser = `-- name: GetReadingBySlugAndUser :one
SELECT workflow_log, title, created_at, slug
FROM readings
WHERE slug = $1 AND user_id = $2
`

type GetReadingBySlugAndUserParams struct {
	Slug   string
	UserID uuid.UUID
}

type GetReadingBySlugAndUserRow struct {
	WorkflowLog json.RawMessage
	Title       string
	CreatedAt   time.Time
	Slug        string
}

func (q *Queries) GetReadingBySlugAndUser(ctx context.Context, arg GetReadingBySlugAndUserParams) (GetReadingBySlugAndUserRow, error) {
	row := q.db.QueryRowContext(ctx, getReadingBySlugAndUser, arg.Slug, arg.UserID)
	var i GetReadingBySlugAndUserRow
	err := row.Scan(
		&i.WorkflowLog,
		&i.Title,
		&i.CreatedAt,
		&i.Slug,
	)
	return i, err
}

const getReadingsByUser = `-- name: GetReadingsByUser :many
SELECT workflow_log, title, created_at, slug
FROM 
    readings
WHERE 
    user_id = $1
ORDER BY 
    created_at DESC
`

type GetReadingsByUserRow struct {
	WorkflowLog json.RawMessage
	Title       string
	CreatedAt   time.Time
	Slug        string
}

func (q *Queries) GetReadingsByUser(ctx context.Context, userID uuid.UUID) ([]GetReadingsByUserRow, error) {
	rows, err := q.db.QueryContext(ctx, getReadingsByUser, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetReadingsByUserRow
	for rows.Next() {
		var i GetReadingsByUserRow
		if err := rows.Scan(
			&i.WorkflowLog,
			&i.Title,
			&i.CreatedAt,
			&i.Slug,
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
