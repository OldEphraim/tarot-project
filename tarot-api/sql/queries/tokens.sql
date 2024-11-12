-- name: CreateRefreshToken :one
INSERT INTO refresh_tokens (token, created_at, updated_at, user_id, expires_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING token, created_at, updated_at, user_id, expires_at;

-- name: GetUserFromRefreshToken :one
SELECT * FROM refresh_tokens WHERE token = $1 AND (expires_at > NOW());

-- name: DeleteRefreshToken :exec
DELETE FROM refresh_tokens WHERE token = $1;