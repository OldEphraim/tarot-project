-- name: AddFavorite :one
INSERT INTO favorites (id, user_id, image_url, card_name, art_style, journal_entry) 
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) 
RETURNING id, user_id, image_url, card_name, art_style, journal_entry, created_at;

-- name: GetFavoritesByUser :many
SELECT 
    image_url, 
    card_name, 
    art_style,
    journal_entry
FROM 
    favorites
WHERE 
    user_id = $1;

-- name: GetFavoriteById :one
SELECT 
    id,
    user_id,
    image_url, 
    card_name, 
    art_style,
    journal_entry,
    created_at
FROM 
    favorites
WHERE 
    id = $1;