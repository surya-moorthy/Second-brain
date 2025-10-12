import { Router } from "express";
import { authRouter } from "./signup";

export const rootRouter : Router = Router();
rootRouter.use("/user",authRouter);