import {prisma} from "@repo/db"
import bcrypt from "bcrypt";
 
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
}