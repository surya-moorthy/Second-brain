import { AuthController } from "../controllers/controllers";
import { Request, Response, Router } from "express";

export const authRouter : Router = Router();
const JWT_SECRET = "jwtsecret";

authRouter.post("/signup",AuthController.signup);
authRouter.post("/signin",AuthController.login);