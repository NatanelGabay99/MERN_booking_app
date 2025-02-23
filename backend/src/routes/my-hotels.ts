import express, { Request, Response } from "express";
import { upload } from "../multer/multer.config.js";
import cloudinary from "cloudinary";
import { HotelType } from "../models/hotel.model.js";
import Hotel from "../schemas/hotelSchema.js";
import { verifyToken } from "../middlewares/auth.js";
import { body } from "express-validator";
const router = express.Router();

// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
  body("name").notEmpty().withMessage("Name is required"),
   body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("PricePerNight").notEmpty().isNumeric().withMessage("Price Per Night is required"),
  body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // 1. upload images to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const response = await cloudinary.v2.uploader.upload(dataURI);
        return response.url;
      });

      // 2. if upload was sucessful, add the URL's to the new hotel object
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      // 3. save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4. return a 201 status
      res.status(201).json({ message: "Hotel created successfully" });
    } catch (error) {
      console.log("Error creating Hotel:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
