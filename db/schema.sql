CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email TEXT NOT NULL,
    password TEXT NOT NULL,
    provider_id TEXT NOT NULL
);

CREATE TABLE chat_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	account_id UUID NOT NULL,
    value TEXT NOT NULL,
    create_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
