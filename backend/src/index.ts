import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config"; 
import mongoose from  "mongoose"; //  mongoose allows to connect to the database
import userRoutes from "./routes/usersRestController.js";
import authRoutes from "./routes/auth.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);


const app = express(); 

app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json()); // helps convert the body of API requests to JSON
app.use(express.urlencoded({extended: true})); // helps parse the url

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(8080, ()=> {
    console.log("Server is running on localhost:8080");
})