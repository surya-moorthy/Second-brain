// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/services";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const newUser = await AuthService.signup(username, password);

      res.status(200).json({
        user: newUser,
        message: "User registered successfully",
      });
    } catch (error: any) {
      if (error.message === "Invalid Inputs") {
        return res.status(400).json({ message: "Error in inputs" });
      }

      if (error.message === "User already exists") {
        return res.status(409).json({ message: error.message });
      }

      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}
