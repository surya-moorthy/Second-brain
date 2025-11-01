import { Router } from "express";
import { BrainController } from "../controllers/brainController/controllers";
import { authMiddleware } from "../middleware/userMiddleware";

export const brainRouter: Router = Router();

brainRouter.post("/share", authMiddleware, BrainController.createShareLink);
brainRouter.get("/", BrainController.getSharedBrain);
brainRouter.get("/links", authMiddleware, BrainController.getUserShareLinks);
brainRouter.delete("/share/:hash", authMiddleware, BrainController.deleteShareLink);
brainRouter.patch("/share/:hash/toggle", authMiddleware, BrainController.toggleShareStatus);