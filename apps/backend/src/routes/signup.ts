import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { AuthController } from "../controllers/controllers";

export const authRouter : Router = Router();
const JWT_SECRET = "jwtsecret";

authRouter.post("/signup",AuthController.signup);


// authRouter.post("/login",async (req : Request,res : Response)=> {
    
//     try{
//     const user = req.body;

//     if (user.username == "" || user.password == "") {
//         res.status(403).json({
//             message : "Error in Inputs" 
//         })
//         return
//     }

//     const verfiyUser = await UserModel.findOne({
//          username : user.username
//         },
//     ).select({
//         username : 1,
//         password : 1
//     })

    
//     if(!verfiyUser) {
//         res.status(411).json({
//             message : "User not found"
//         })
//         return
//     }

//     const hashedPassword = verfiyUser.password as string

//     const verifyPassword = await bcrypt.compare(user.password,hashedPassword)
//     if(!verifyPassword) {
//         res.status(403).json({
//             message : "User unauthorized."
//         })
//         return
//     }
//     const token = jwt.sign({id : verfiyUser._id, username : verfiyUser.username},JWT_SECRET,{expiresIn : 60000});

//     res.status(200).json({
//         token : token,
//         message : "User registered Successfully" 
//     })}catch(err) {
//         console.error(err);
//        res.status(500).json({
//         message : "Internal Server Error",
//         error : err
//        })
//     }
// })