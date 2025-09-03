import dotenv from "dotenv"
dotenv.config();

import connectDB from "./src/db/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app=express();

// middlewares.....
app.use(cors({origin:process.env.CORS_ORIGIN}));

app.use(express.json({limit:12}));
app.use(express.urlencoded({limit:16}));
app.use(express.static("public"));
 
// database coonnection
connectDB();


//  Routers 
import userRouter from './src/routes/user.js';
 app.use('/api/v1/users',userRouter);


const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})