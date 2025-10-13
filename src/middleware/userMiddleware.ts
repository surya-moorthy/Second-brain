import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../db/db";

const JWT_SECRET = "jwtsecret";

export const userMiddleware = async (req : Request, res : Response,next : NextFunction) => {
    const headers = req.headers["authorization"];

    if( headers == "" || !headers?.startsWith("Bearer ")) {
          res.status(403).json({
            message : "Authorization header needed"
          })
          return
    };

    const token = headers.split(" ")[1];
    const decodeToken = jwt.verify(token,JWT_SECRET) as JwtPayload;
   
     const verfiyUser = await UserModel.findById(decodeToken.id).select("-password");
     if (!verfiyUser) {
        res.status(411).json({
            message : "user unauthorized"
        })
        return;
     }
    next();

}