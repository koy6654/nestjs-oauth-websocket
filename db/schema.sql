CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email TEXT NOT NULL,
    password TEXT NOT NULL,
    provider_id TEXT NOT NULL
);
