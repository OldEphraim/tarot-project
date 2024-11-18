-- +goose Up
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    card_name TEXT NOT NULL,
    art_style TEXT NOT NULL,
    journal_entry TEXT DEFAULT NULL
);

-- +goose Down
DROP TABLE favorites;