-- +goose Up
ALTER TABLE favorites
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT now();

-- Set updated_at to created_at for existing rows
UPDATE favorites
SET updated_at = created_at;

-- +goose Down
ALTER TABLE favorites
DROP COLUMN updated_at;