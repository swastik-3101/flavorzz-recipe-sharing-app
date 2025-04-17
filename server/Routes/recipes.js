
import express from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/users.js";
import mongoose from "mongoose";

const router = express.Router();
router.get("/",async(req,res)=>{
    try{
        const response = await RecipesModel.find({});
        res.json(response);
    } 
    catch(err){
        res.json(err);
    }
});
router.post("/",async(req,res)=>{
    console.log(req.body);
    
    const recipe = new RecipesModel(req.body);
    try{
        const response = await recipe.save();
        res.json(response);
        
        
    }
    catch(err){
        res.json(err); 
    }
});
router.put("/",async(req,res)=>{
    try{
        const recipe = await RecipesModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);    
        await user.save();
        res.json({savedRecipes: user.savedRecipes})
        
        
    }
    catch(err){
        res.json(err); 
    }
});
router.get("/savedRecipes/ids/:userID", async (req,res)=>{
    try{
        const user =await UserModel.findById(req.params.userID);
        res.json({savedRecipes:user?.savedRecieps});
    }catch(err){
        res.json(err);
    }
});
router.get("/savedRecipes", async (req,res)=>{
    try{
        const user =await UserModel.findById(req.body.userID);
        savedRecipes = await RecipeModel.find({
            _id:{_in :user.savedRecipes}
        })
        res.json({savedRecipes});
    }catch(err){
        res.json(err);
    }
})



export {router as recipeRouter}; 