import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"; //  mongoose allows to connect to the database
import userRoutes from "./routes/usersRestController.js";
import authRoutes from "./routes/auth.js";
import myHotelRoutes from "./routes/my-hotels.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json()); // helps convert the body of API requests to JSON
app.use(express.urlencoded({ extended: true })); // helps parse the url


/* app.use(express.static(path.join(__dirname, '../../frontend/dist')))
 */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use('/my-hotels', myHotelRoutes);

app.listen(8080, () => {
  console.log("Server is running on localhost:8080");
});
