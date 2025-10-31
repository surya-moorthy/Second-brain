import dotenv from "dotenv"
import { PrismaClient } from "./generated/prisma/client.ts";

dotenv.config();

export const client = new PrismaClient();