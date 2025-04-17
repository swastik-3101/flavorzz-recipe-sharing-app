import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {userRouter} from "./Routes/users.js"
import {recipeRouter} from "./Routes/recipes.js"

const app= express();
app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipe",recipeRouter);

mongoose.connect("mongodb+srv://swastikkr1908:mummyji31@recipe.8ftsw.mongodb.net/RECIPE?retryWrites=true&w=majority&appName=RECIPE");
app.listen(3001,()=>console.log("server started")); 
