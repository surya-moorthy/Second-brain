// import { Request, Response, Router } from "express";
// import { generateRandomString } from "../utils/utils";

// export const brainRouter : Router = Router();

// brainRouter.post("/share", async (req : Request,res : Response) => {
//        try{
//         const share = req.body.share;
//         const userId = req.userId;

//         if(!share) {
//             // return;
//         }
//         const randomString = generateRandomString(10);
//         console.log(randomString);

//         const createLinkResponse = await LinkModel.create({
//             hash : randomString,
//             share : share,
//             user : req.userId
//         })

//         res.status(200).json({
//            link : createLinkResponse.hash
//         })

//        }catch(err) {
//         res.status(500).json({
//             message : "Internal Server Error"
//         })
//        } 
// })

// brainRouter.get("/", async (req : Request,res : Response) => {
//        try{
//         const link = req.query.shareLink;

//      const linkResponse = await LinkModel
//         .findOne({ hash: link })
//         .populate<{user : { _id : string, username : string}}>({ path: "user", select: "username" });

//         if(!linkResponse) {
//             res.status(403).json({
//                 message : "If the share link is invalid"
//             })
//             return
//         }
//         console.log(linkResponse);
//         const userId = linkResponse.get("userId");

//         const contents = await ContentModel.find({
//             userId : userId
//         }).select("-userId");

//         res.status(200).json({
//             username : linkResponse.user.username,
//             contents : contents
//         })

//        }catch(err) {
//         res.status(500).json({
//             message : "Internal Server Error"
//         })
//        }
       
// })
