import { Request, Response, Router } from "express";
import { ContentModel } from "../db/db";



export const contentRouter : Router = Router();

// create a new content

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
         link : content.link,
         userId : req.userId
     })

     console.log(contentResponse);

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

// find content based on Id


contentRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const contentId = req.params.id;  // ✅ get from params
        const contents = await ContentModel.findById(contentId);

        if (!contents) {
            return res.status(404).json({
                message: "Content not found"
            });
        }

        return res.status(200).json({ contents });

    } catch (err) {
        console.error("Error fetching content:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// delete content based on id

contentRouter.delete("/", async (req : Request,res : Response) => {
    try {

        const contentId = req.query.id;

        const findcontent = await ContentModel.findOne({id : contentId, userId : req.userId})

        console.log(findcontent);
       
       const content = await ContentModel.findByIdAndDelete( contentId ) 

        res.status(200).json({
            content,
            message : "deleted successfully"
        })

    }catch(err) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

// fetch all the contents

contentRouter.get("/", async (req : Request,res : Response) => {
    try {

        const contents = await ContentModel.find();
        console.log(contents);

        res.status(200).json({
            contents
        })

    }catch(err) {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})