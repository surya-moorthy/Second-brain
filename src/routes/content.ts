import { Request, Response, Router } from "express";
import { ContentModel } from "../db/db";


export const contentRouter : Router = Router();

contentRouter.post("/", async (req : Request,res : Response) => {
    try 
    { const content = req.body;

     if(content.type == "" || content.link == "" || content.title == "") {
        res.status(403).json({
            message : "Incorrect Inputs"
        })
     }

     const contentResponse = await ContentModel.create({
         title : content.title,
         type : content.type,
         link : content.link
     })

     res.status(200).json({
        contentId : contentResponse._id, 
        message : "Content created Successfully"
     })
 } catch(err) {
    console.error(err);
       res.status(500).json({
        message : "Internal Server Error"
       })
 }
     
})