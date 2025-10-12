import { Request, Response, Router } from "express";
import { UserModel } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

export const authRouter : Router = Router();

const JWT_SECRET = "jwtsecret";

authRouter.post("/signup",async (req : Request,res : Response)=> {
    
    try{
    const user = req.body;

    if (user.username == "" || user.password == "") {
        res.status(403).json({
            message : "Error in Inputs" 
        })
    }
    const passwordHash = bcrypt.hash(user.password,10,function(err, hash){
        if(err) {
            console.log(err)
        }
        return hash
    });

    const verfiyUser = await UserModel.findOne({
        username : user.username
    }) // check user already exist.
    
    if(verfiyUser) {
        res.status(411).json({
            message : "User already exist"
        })
    }

    const userResponse = await UserModel.create({
         username : user.username,
         password : passwordHash
    })

    res.status(200).json({
        user : userResponse,
        message : "User registered Successfully" 
    })}catch(err) {
       res.status(500).json({
        message : "Internal Server Error"
       })
    }
})


authRouter.post("/login",async (req : Request,res : Response)=> {
    
    try{
    const user = req.body;

    if (user.username == "" || user.password == "") {
        res.status(403).json({
            message : "Error in Inputs" 
        })
    }

    //   const passwordHash = bcrypt.hash(user.password,10);

    const verfiyUser = await UserModel.find({
         username : user.username
        },
    ).select({
        username : true,
        password : false
    })

    
    if(!verfiyUser) {
        res.status(411).json({
            message : "User not found"
        })
    }

    const verifyPassword = await bcrypt.compare()

    const token = jwt.sign(verfiyUser,JWT_SECRET);

    res.status(200).json({
        token : token,
        message : "User registered Successfully" 
    })}catch(err) {
       res.status(500).json({
        message : "Internal Server Error"
       })
    }
})