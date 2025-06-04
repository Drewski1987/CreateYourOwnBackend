DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL

);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    prep_time INTEGER NOT NULL
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    quantity INTEGER NOT NULL,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE
    
);

