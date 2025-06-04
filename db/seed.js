import db from "#db/client";
import { createRecipe } from "./queries/recipes.js";
import { createIngredient } from "./queries/ingredients.js";
import { createUser } from "./queries/ingredients.js"





console.log("🌱 Database seeded.");



// Recipe seed data

async function seedIngredients(){
    await db.connect()

    const recipes = [

  { title: 'Bolognese', instructions: 'Cook pasta. Simmer sauce. Combine.', prep_time: 30 },
  { title: 'Pancakes', instructions: 'Mix ingredients. Fry on pan.', prep_time: 15 },
  { title: 'Taco Salad', instructions: 'Layer lettuce, beef, cheese, and salsa.', prep_time: 20 },
  { title: 'Grilled Cheese', instructions: 'Butter bread. Add cheese. Grill.', prep_time: 10 },
  { title: 'Veggie Stir Fry', instructions: 'Cook veggies. Add sauce. Serve with rice.', prep_time: 25 },
  { title: 'Spagheti', instructions: 'Cook pasta. Simmer sauce. Combine.', prep_time: 31 },
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
       


seedIngredients();


const users = [
    {first_name: 'John', last_name: 'Hill', email: 'johnhill@gmail.com', password: '123'},
    {first_name: 'Choice', last_name: 'Hopkins', email: 'choicehopkins@gmail.com', password: '456'},
    {first_name: 'Cherry', last_name: 'Bush', email: 'cherrybush@gmail.com', password: '789'},
    {first_name: 'Jay', last_name: 'Belton', email: 'jaybelton@gmail.com', password: '100'},
    {first_name: 'Maurice', last_name: 'drew', email: 'drewm1987@gmail.com', password: '111'},
    {first_name: 'Thomas', last_name: 'Fuller', email: 'thomasfuller@gmail.com', password: '222'}
];



    for(const user of users) {
        await createUser(user);
    }
     await db.end();
}



