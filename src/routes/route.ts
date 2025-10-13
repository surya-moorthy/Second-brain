import { Router } from "express";
import { authRouter } from "./signup";
import { contentRouter } from "./content";
import { userMiddleware } from "../middleware/userMiddleware";
import { brainRouter } from "./brain";

export const rootRouter : Router = Router();
rootRouter.use("/user",authRouter);
rootRouter.use("/contents",userMiddleware,contentRouter);
rootRouter.use("/brain",userMiddleware,brainRouter);