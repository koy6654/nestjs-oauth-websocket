CREATE EXTENSION pgcrypto;

CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email TEXT NOT NULL,
    password TEXT NOT NULL
);
