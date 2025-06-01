DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients;

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