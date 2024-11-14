-- +goose Up
ALTER TABLE users
ADD COLUMN art_style TEXT DEFAULT NULL,
ADD COLUMN profile_picture TEXT DEFAULT NULL;

-- +goose Down
ALTER TABLE users
DROP COLUMN art_style,
DROP COLUMN profile_picture;