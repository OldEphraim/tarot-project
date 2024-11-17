-- +goose Up
ALTER TABLE readings ADD COLUMN slug TEXT UNIQUE;

-- Populate the slug column for existing rows
UPDATE readings
SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));

-- Ensure the slug column is not null
ALTER TABLE readings ALTER COLUMN slug SET NOT NULL;

-- +goose Down
ALTER TABLE readings DROP COLUMN slug;