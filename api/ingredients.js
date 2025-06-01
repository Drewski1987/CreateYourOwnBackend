import { createIngredient, getIngredientsIncludingRecipe } from "../db/queries/ingredients";
import express from "express"
const ingredientsRouter = express.Router()
export default ingredientsRouter

ingredientsRouter.route("/").get(async (req, res)=>{
    const ingredients = await getIngredientsIncludingRecipe()
    res.send(ingredients)
})

ingredientsRouter.route("/:id").get(async(req, res)=>{
    const id = Number(req.params.id)
    const foundIngredient = await getIngredientsIncludingRecipe(id)
    
    if(!foundIngredient){
        return res.status(404).send("There is no ingredient with that id")
    }
})

ingredientsRouter.route("/").post(async(req, res)=>{
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