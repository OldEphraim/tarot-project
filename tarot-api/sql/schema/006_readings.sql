-- +goose Up
CREATE TABLE readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    workflow_log JSONB NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL
);

-- +goose Down
DROP TABLE readings;
