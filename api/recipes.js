
import { createRecipe, getRecipes, getRecipesByIDFromIngredients, updateRecipe, deleteRecipe } from "../db/queries/recipes";
import express from "express"
import { verifyToken } from "../auth";
const recipesRouter= express.Router()
export default recipesRouter

// GET /recipes
recipesRouter.route("/").get(async (req, res)=>{
    const recipes = await getRecipes()
    res.send(recipes)
})
//GET /recipes/:id
recipesRouter.route("/:id").get(async(req, res)=>{
    const id = Number(req.params.id)
    const foundRecipe = await getRecipesByIDFromIngredients(id)

    if(!foundRecipe){
        return res.status(400).send("There is no recipe with that id")
    }
    res.send(foundRecipe)
})

//POST /recipes/:id/

recipesRouter.route("/:id").post(verifyToken,async(req, res)=>{
    const id = Number (req.params.id)
    const foundRecipe = await getRecipesByIDFromIngredients(id)

    if(!foundRecipe){
        return res.status(404).send("There is no recipe with that id")
    }
    if (!req.body){
        return res.status(400).send("Missing request body")
    }
    const {title, instructions, prep_time} = req.body

    if(!title || !instructions || !prep_time){
        return res.status(400).send("Missing required fields")
    }
    const newRecipe = await createRecipe({title, instructions, prep_time})
    res.status(201).send(newRecipe)
})


// Delete /recipe/:id
recipesRouter.route("/:id").delete(verifyToken,async(req, res)=>{
    const id = Number(req.params.id)

    if (!isValidId(id)){
        return res.status(400).send("ID must be valid")
    }
    const removeRecipe = await deleteRecipe(id)

    if (!removeRecipe){
        return res.status(404).send("Recipe not found")
    }
    res.sendStatus(204)
})

// /PUT /recipes/:id 

recipesRouter.route("/:id").put(verifyToken,async (req, res) => {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).send( "ID must be a valid" );
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send( "Missing body");
  }

  const {title, instructions, prep_time} = req.body;

  if (!title || !instructions || !prep_time === undefined) {
    return res.status(400).send("Missing required fields" );
  }

  const recipe = await getRecipe(id);
  if (!recipe) {
    return res.status(404).send( "Recipe not found");
  }

  const renewRecipe = await updateRecipe({
    id,
    title,
    instructions,
    prep_time,
  });

  if (!renewRecipe) {
    return res.status(404).send( "Recipe not found" );
  }

  res.send(renewRecipe);
});
