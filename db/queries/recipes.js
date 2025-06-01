import db from "#db/client";

export async function createRecipe({title, instructions, prep_time}){
    const sql = `
    INSERT INTO recipes (title, instructions, prep_time) VALUES ($1, $2, $3) RETURNING *;
    `
    const {rows: [recipe]} = await db.query(sql, [title, instructions, prep_time])
    return recipe
}

export async function getRecipes(){
    const sql = `
    SELECT * FROM recipes;
    `
    const {rows: recipes} = await db.query(sql)
    return recipes
}

export async function getRecipesByIDFromIngredients(id){
    const sql = `
    SELECT recipes.*,
    (
    SELECT to_json(ingredients)
    FROM ingredients
    WHERE ingredients.recipe_id = recipes.id
    ) AS ingredients FROM recipes WHERE ID = $1
    `
    const {rows: [recipe]} = await db.query(sql, [id])
    return recipe

}