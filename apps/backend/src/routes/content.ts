import { ContentController } from "../controllers/contentController/controllers";
import { Router } from "express";

export const contentRouter : Router = Router();

// create a new content
contentRouter.post("/create",ContentController.createContent);
contentRouter.get("/:id",ContentController.getContentById);
contentRouter.get("/",ContentController.getAllContents);
contentRouter.delete("/:id",ContentController.deleteContent);