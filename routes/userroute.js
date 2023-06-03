const express=require('express');

const {UserModel}=require("../models/usermodel");

const userrouter=express.Router();

const jwt =require('jsonwebtoken');

const bcrypt= require('bcrypt');

require('dotenv').config();

userrouter.post("/signup",async(req,res)=>{
    const {email,password,confirmpassword}=req.body;

    const find_email=await UserModel.find({email});

    if(find_email.length>0){
        return res.json({"msg":"Email already exists"})
    }
    if(password!=confirmpassword){
        return res.json({"msg":"Password and Confirm_password doesn't match"})
    }


    try {
     bcrypt.hash(password,5,async(err,secure_password)=>{
        if(err){
            res.json({"msg":"Error while hashing the password"})
        }else{
            let user_data=new UserModel({email,password:secure_password,confirmpassword:secure_password});
            await user_data.save();
            res.json({"msg":"Successfully registered the user"})
        }
     })

        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while registering the user"})
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    const find_email=await UserModel.find({email});
     
    const hashed_password=find_email[0].password;
     console.log(hashed_password)

    try {
       bcrypt.compare(password,hashed_password,(err,result)=>{
            
            if(result){
                let token=jwt.sign({UserId:find_email[0]._id},process.env.key);
                res.json({"msg":"Successfully logged in the user","token":token});

            }else{
                res.json({"msg":"Wrong Credentials"})
            }
       })
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while logging the user"})
    }
})


module.exports={
    userrouter
}



// {
//     "email":"nikhil@gmail.com",
//     "password":"nikhil"
    
//   }