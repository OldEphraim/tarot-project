-- name: CreateUser :one
INSERT INTO users (id, username, created_at, updated_at, email, hashed_password)
VALUES (
    gen_random_uuid(), $1, NOW(), NOW(), $2, $3
)
RETURNING *;

-- name: CheckUsernameExists :one
SELECT COUNT(*) > 0
FROM users
WHERE username = $1;

-- name: CheckEmailExists :one
SELECT COUNT(*) > 0
FROM users
WHERE email = $1;

-- name: GetUserByUsername :one
SELECT id, email, username, created_at, updated_at, hashed_password, art_style, profile_picture
FROM users
WHERE username = $1;

-- name: UpdateUserLogoutTimestamp :exec
UPDATE users
SET updated_at = NOW()
WHERE username = $1;