import { createIngredient, getIngredientsIncludingRecipe, deleteIngredient, getIngredient, updateIngredient } from "../db/queries/ingredients";
import express from "express"
import { verifyToken } from "../auth";
const ingredientsRouter = express.Router()
export default ingredientsRouter


// Get /ingredient

ingredientsRouter.route("/").get(async (req, res)=>{
    const ingredients = await getIngredientsIncludingRecipe()
    res.send(ingredients)
})

//Get /ingredient/:id 

ingredientsRouter.route("/:id").get(async(req, res)=>{
    const id = Number(req.params.id)
    const foundIngredient = await getIngredientsIncludingRecipe(id)
    
    if(!foundIngredient){
        return res.status(404).send("There is no ingredient with that id")
    }
})

// Post /ingredient

ingredientsRouter.route("/").post(verifyToken, async(req, res)=>{
    const id = Number(req.params.id)
    const foundIngredient = await getIngredientsIncludingRecipe(id)

    if(!foundIngredient){
        return res.status(400).send("There is no ingredient with that id")
    }
    if (!req.body){
        return res.status(400).send("Missing request body")
    }
    const {name, quantity, recipe_id} = req.body

    if (!name || !quantity || !recipe_id){
        return res.status(400).send("Missing required fields")
    }

    const newIngredient = await createIngredient({name, quantity, recipe_id})
    res.status(201).send(newIngredient)
    
})
 
// Delete /ingredients/:id

ingredientsRouter.route("/:id").delete(verifyToken, async(req, res)=>{
    const id = Number(req.params.id)

    if (!isValidId(id)){
        return res.status(400).send("ID must be valid")
    }
    const removeIngredient = await deleteIngredient(id)

    if (!removeIngredient){
        return res.status(404).send("Recipe not found")
    }
    res.sendStatus(204)
})

// /PUT /ingredients/:id 

ingredientsRouter.route("/:id").put(verifyToken, async (req, res) => {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).send( "ID must be a valid" );
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send( "Missing body");
  }

  const {name, quantity, recipe_id} = req.body;

  if (!name || !quantity || recipe_id === undefined) {
    return res.status(400).send("Missing required fields" );
  }

  const ingredient = await getIngredient(id);
  if (!ingredient) {
    return res.status(404).send( "Ingredient not found");
  }

  const updatedIngredient = await updateIngredient({
    id,
    name,
    quantity,
    recipeId: recipe_id,
  });

  if (!updatedIngredient) {
    return res.status(404).send( "Ingredient not found" );
  }

  res.send(updatedIngredient);
});
