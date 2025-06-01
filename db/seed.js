import db from "#db/client";
import { createRecipe } from "./queries/recipes.js";
import { createIngredient } from "./queries/ingredients.js";





console.log("🌱 Database seeded.");



// Recipe seed data

async function seedIngredients(){
    await db.connect()

    const recipes = [

  { title: 'Spaghetti Bolognese', instructions: 'Cook pasta. Simmer sauce. Combine.', prep_time: 30 },
  { title: 'Pancakes', instructions: 'Mix ingredients. Fry on pan.', prep_time: 15 },
  { title: 'Taco Salad', instructions: 'Layer lettuce, beef, cheese, and salsa.', prep_time: 20 },
  { title: 'Grilled Cheese', instructions: 'Butter bread. Add cheese. Grill.', prep_time: 10 },
  { title: 'Veggie Stir Fry', instructions: 'Cook veggies. Add sauce. Serve with rice.', prep_time: 25 },
  { title: 'Spaghetti', instructions: 'Cook pasta. Simmer sauce. Combine.', prep_time: 31 },
  { title: 'Wheat Pancakes', instructions: 'Mix ingredients. Add wheat. Fry on pan.', prep_time: 16 },
  { title: 'Taco', instructions: 'lettuce, beef, cheese, and salsa.', prep_time: 21 },
  { title: 'Grilled bologne sandwich', instructions: 'Butter bread. Add bologne. Grill.', prep_time: 11 },
  { title: 'Veggies', instructions: 'Cook veggies. Add butter. Serve.', prep_time: 19 },

    ];
    for (const recipe of recipes){
        await createRecipe(recipe);
    }

// Ingredient seed data
    const ingredients = [

  { name: 'Spaghetti', quantity: 200, recipe_id: 1 },
  { name: 'Ground Beef', quantity: 150, recipe_id: 1 },
  { name: 'Pancake Mix', quantity: 1 , recipe_id: 2 },
  { name: 'Egg', quantity: 1, recipe_id: 2 },
  { name: 'Lettuce', quantity: 2 , recipe_id: 3 },
  { name: 'Salsa', quantity: 1, recipe_id: 3 },
  { name: 'Cheddar Cheese', quantity: 2, recipe_id: 4 },
  { name: 'Butter', quantity: 1, recipe_id: 4 },
  { name: 'Mixed Vegetables', quantity: 1, recipe_id: 5 },
  { name: 'Soy Sauce', quantity: 2 , recipe_id: 5 },
    
    ];
    for (const ingredient of ingredients){
        await createIngredient(ingredient);
    }
        await db.end();
}
seedIngredients()