-- Add UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
-- For more information, please visit:
-- https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
SET TIMEZONE="UTC";

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE DEFAULT NOW (),
    rawdata JSONB NOT NULL,
    email TEXT GENERATED ALWAYS AS (rawdata->>'email') STORED,
);

DROP TABLE IF EXISTS lessons;
CREATE TABLE lessons (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE DEFAULT NOW (),
    rawdata JSONB NOT NULL,
);

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE DEFAULT NOW (),
    rawdata JSONB NOT NULL,
    courseid TEXT GENERATED ALWAYS AS (rawdata->>'courseId') STORED,
    title TEXT GENERATED ALWAYS AS (rawdata->>'title') STORED,
    description TEXT GENERATED ALWAYS AS (rawdata->>'description') STORED,
    image TEXT GENERATED ALWAYS AS (rawdata->>'image') STORED,
    subject TEXT GENERATED ALWAYS AS (rawdata->>'subject') STORED,
    instructor TEXT GENERATED ALWAYS AS (rawdata->>'instructor') STORED,
);




