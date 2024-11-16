-- +goose Up
ALTER TABLE favorites
ADD COLUMN card_name TEXT DEFAULT NULL,
ADD COLUMN art_style TEXT DEFAULT NULL;

-- +goose Down
ALTER TABLE users
DROP COLUMN card_name,
DROP COLUMN art_style;