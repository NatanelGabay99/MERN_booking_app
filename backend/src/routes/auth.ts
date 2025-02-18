import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // Destructuring email and password from req.body

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth-token", token, {
        httpOnly: true, // this httpOnly cookie can only be accessed by the server
        secure: process.env.NODE_ENV === "production", // this cookie can only be accessed by https (so that hackers can't access it)
        maxAge: 86400000, // this cookie will expire in 24 hours
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

// this endpoint will allow the frontend to check if the user is logged in
router.post('/validate-token', verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});

export default router;
