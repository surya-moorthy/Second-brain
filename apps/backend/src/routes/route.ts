import { Router } from "express";
import { authRouter } from "./signup";
import { authMiddleware } from "../middleware/userMiddleware";
import { contentRouter } from "./content";
import { brainRouter } from "./brain";

export const rootRouter : Router = Router();

rootRouter.use("/user",authRouter);
rootRouter.use("/content",authMiddleware,contentRouter);
rootRouter.use("/brain",brainRouter);