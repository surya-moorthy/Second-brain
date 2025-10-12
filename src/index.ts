import express from "express"
// import { rootRouter } from "./routes/route";
import { connect } from "mongoose";
import { authRouter } from "./routes/signup";

const app = express();
app.use(express.json());


app.use("/",authRouter);

app.listen(3000,()=>{
    console.log(`the app is running at app http://localhost:3000`);
})