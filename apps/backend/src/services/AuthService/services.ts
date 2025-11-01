import {prisma} from "@repo/db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {LoginUserType} from "@/types/types"
 
const jwtsecret = process.env.JWT_SECRET || "braindb-secret";
export class AuthService {
    static async signup(username : string , password : string) {
     
        if(username == "" || password == "") {
            throw new Error("Invalid Inputs")
        }
        const findUser = await prisma.user.findFirst({
            where : {
                username : username
            }
        });
        if(findUser) {
            throw new Error("User already exists")
        }
        const passwordHash = await bcrypt.hash(password,10);

        const createUser = await prisma.user.create({
            data : {
                username : username,
                password : passwordHash
            },
            omit : {
                password : true
            }
        }) 

        return createUser;
    }
    
    static async login(username : string,password : string) {
         if(username == "" || password == "") {
            throw new Error("Invalid Inputs")
        }
        const findUser = await prisma.user.findFirst({
            where : {
                username : username
            }
        });

        if(!findUser) {
            throw new Error("Unable to find the User.")
        }

        const verifyPassword = await bcrypt.compare(password,findUser.password);

        if(!verifyPassword) {
              throw new Error("Incorrect password.")
        }
        const token = jwt.sign(findUser.id,jwtsecret);

        const result : LoginUserType = {
            UserType : {
                username,
                password
            },
            token
        } 

        return result;
    }
}