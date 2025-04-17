import express from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import { UserModel } from "../models/users.js";
const router = express.Router();
router.post("/register", async( req,res)=>{
    
    
    const {username,password} =req.body;
    const user = await UserModel.findOne({username});
    
    if(user){
        return res.json({message:"user already exists!"});
    }
    const hashedPassword =await bycrypt.hash(password,10);
    const newUser = new UserModel ({username,password : hashedPassword});
    await newUser.save();
    res.json({message:"User Registered Succesfully"});
});

router.post("/login", async(req,res)=>{
    console.log("hi");
    
    
    const {username,password} =req.body;
    const user = await UserModel.findOne({username});
    
    if(!user){
        return res.json({ message:"User does not exist!"});
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message : "password incorrect!"});
    }
    const token =jwt.sign({id:user._id},"secret");
    res.json({token ,userID : user._id });

});
    





router.post("/login");

export {router as userRouter};