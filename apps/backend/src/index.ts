import express, { Request, Response } from "express"
// import { rootRouter } from "./routes/route";
import cors from "cors";
import dotenv from "dotenv";
import { rootRouter } from "./routes/route";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.use("/api/v1/",rootRouter);


app.listen(3000,()=>{
    console.log(`the app is running at app http://localhost:3000`);
})