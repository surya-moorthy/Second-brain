import express, { Request, Response } from "express"
// import { rootRouter } from "./routes/route";
import cors from "cors";
import { rootRouter } from "./routes/route";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/",rootRouter);


app.listen(3000,()=>{
    console.log(`the app is running at app http://localhost:3000`);
})