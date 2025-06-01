import { createRecipe, getRecipes, getRecipesByIDFromIngredients } from "../db/queries/recipes";
import express from "express"
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

recipesRouter.route("/:id").post(async(req, res)=>{
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