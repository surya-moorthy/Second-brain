import express, { Request, Response } from "express"
// import { rootRouter } from "./routes/route";
import bcrypt from "bcrypt";
import {UserModel} from "./db/db"
import { rootRouter } from "./routes/route";

const app = express();
app.use(express.json());
app.use("/api/v1/",rootRouter);


app.listen(3000,()=>{
    console.log(`the app is running at app http://localhost:3000`);
})