-- name: AddFavorite :exec
INSERT INTO favorites (user_id, image_url, card_name, art_style) VALUES ($1, $2, $3, $4);