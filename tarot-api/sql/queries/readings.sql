-- name: AddReading :exec
INSERT INTO readings (user_id, workflow_log, title, slug) VALUES ($1, $2, $3, $4);

-- name: GetReadingsByUser :many
SELECT workflow_log, title, created_at, slug
FROM 
    readings
WHERE 
    user_id = $1
ORDER BY 
    created_at DESC; 

-- name: GetReadingBySlugAndUser :one
SELECT workflow_log, title, created_at, slug
FROM readings
WHERE slug = $1 AND user_id = $2;