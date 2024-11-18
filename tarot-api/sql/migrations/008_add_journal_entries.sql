-- +goose Up
ALTER TABLE favorites ADD COLUMN journal_entry TEXT DEFAULT NULL;

-- +goose Down
ALTER TABLE favorites DROP COLUMN journal_entry;