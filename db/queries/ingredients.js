import db from "#db/client";


export async function createIngredient ({name, quantity, recipe_id}) {
const sql =`
INSERT INTO ingredients (name, quantity, recipe_id) VALUES ($1, $2, $3) RETURNING *;
`
const {rows: [ingredient]} = await db.query (sql, [name, quantity, recipe_id])
return ingredient
}

export async function getIngredientsIncludingRecipe(){
    const sql = `
    SELECT ingredients.*,
    recipes.name AS recipe_name
    FROM ingredients
    JOIN recipes ON recipes.id = ingredients.recipe_id 
    `
    const {rows: ingredients} = await db.query (sql)
    return ingredients
}
