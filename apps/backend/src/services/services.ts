// src/services/auth.service.ts
import bcrypt from "bcrypt";
import {client} from "@repo/db"

export class AuthService {
  static async signup(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Invalid input");
    }

    const existingUser = await client.user.findFirst({ where : {username} });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await client.user.create({
      data : {
        username,
        password: passwordHash,
      }
    });

    return newUser;
  }
}
