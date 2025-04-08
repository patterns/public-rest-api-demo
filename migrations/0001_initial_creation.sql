-- Migration number: 0001 	 2025-04-05T02:03:21.114Z


CREATE TABLE roles (
    -- Access control roles for administration activities.
    -- (not using foreign key constraint for now, but make business logic manually validate user-create activities.)
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP,
    name AS (json_extract(rawdata, '$.name')) STORED
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP,
    email AS (json_extract(rawdata, '$.email')) STORED,
    rolename AS (json_extract(rawdata, '$.role.name')) STORED,
    useruuid AS (json_extract(rawdata, '$.userUuid')) STORED
);

CREATE TABLE lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP
);

