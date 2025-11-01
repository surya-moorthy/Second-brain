import {prisma} from "@repo/db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {LoginUserType} from "../../types/types"
 
const jwtsecret = process.env.JWT_SECRET || "braindb-secret";
export class AuthService {
    
    static async login(username: string, password: string): Promise<LoginUserType> {
    // Validate inputs
    if (!username || !password || username.trim() === "" || password.trim() === "") {
      throw new Error("Invalid Inputs");
    }

    // Find user
    const findUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!findUser) {
      throw new Error("Unable to find the User.");
    }

    // Verify password
    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
      throw new Error("Incorrect password.");
    }

    // Create JWT token with payload as object
    const token = jwt.sign(
      { id: findUser.id }, // ✅ Payload must be an object
      jwtsecret,
      { expiresIn: "7d" } // Optional: add expiration
    );

    const result: LoginUserType = {
      user: {
        id: findUser.id,
        username: findUser.username,
      },
      token,
    };

    return result;
  }

  // Bonus: Register method
  static async signup(username: string, password: string): Promise<LoginUserType> {
    // Validate inputs
    if (!username || !password || username.trim() === "" || password.trim() === "") {
      throw new Error("Invalid Inputs");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser.id },
      jwtsecret,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: newUser.id,
        username: newUser.username,
      },
      token,
    };
  }

  // Bonus: Verify token method
  static verifyToken(token: string): { id: string } | null {
    try {
      const decoded = jwt.verify(token, jwtsecret) as { id: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}