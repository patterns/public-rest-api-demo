-- Migration number: 0001 	 2025-04-05T02:03:21.114Z


CREATE TABLE roles (
    -- Access control roles for administration activities.
    raw_data TEXT
);

CREATE TABLE users (
    raw_data TEXT
    role_name AS (json_extract(raw_data, '$.role.name')) STORED
);

CREATE TABLE lessons (
    raw_data TEXT
);

CREATE TABLE courses (
    raw_data TEXT
);

/* --seed data for tests
INSERT INTO users (raw_data)
VALUES 
('{"email": "example@davincirenaissance.org", "providerId": "placeholder", "user_uuid": "ABCDEF123456789", "role": {name: "instructor"}}'),
('{"email": "learner@davincirenaissance.org", "providerId": "placeholder", "user_uuid": "XYZABC789012345", "role": {name: "learner"}}');
*/
