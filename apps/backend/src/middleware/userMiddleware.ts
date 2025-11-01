import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@repo/db";

const jwtsecret = process.env.JWT_SECRET || "braindb-secret";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers["authorization"];

    // Check if authorization header exists and has correct format
    if (!headers || !headers.startsWith("Bearer ")) {
      res.status(403).json({
        message: "Authorization header needed",
      });
      return;
    }

    // Extract token
    const token = headers.split(" ")[1];

    if (!token) {
      res.status(403).json({
        message: "Token not provided",
      });
      return;
    }

    // Verify token
    const decodedToken = jwt.verify(token, jwtsecret) as JwtPayload;

    if (!decodedToken.id) {
      res.status(403).json({
        message: "Invalid token payload",
      });
      return;
    }

    // Verify user exists in database
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        username: true,
        // Explicitly exclude password
      },
    });

    if (!verifyUser) {
      res.status(401).json({
        message: "User unauthorized",
      });
      return;
    }

    // Attach userId to request object
    req.userId = verifyUser.id;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        message: "Invalid token",
        error
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({
        message: "Token expired",
      });
      return;
    }

    console.error("Auth middleware error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};