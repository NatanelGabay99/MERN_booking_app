import express, { Request, Response }from "express";
import User from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import { check, validationResult} from "express-validator";

const router = express.Router();

router.post("/register", [
  check('firstName', 'First Name is required').isString(),
  check('lastName', 'Last Name is required').isString(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password with 6 or more characters is required').isLength({ min: 6 }),
  check('phoneNumber', 'Phone Number is required').isString(),
], async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save(); // save() is a MongoDB method to save data to the database

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie('auth-token', token, {
      httpOnly: true, // this httpOnly cookie can only be accessed by the server
      secure: process.env.NODE_ENV === 'production', // this cookie can only be accessed by https (so that hackers can't access it)
      maxAge: 86400000, // this cookie will expire in 24 hours
    });

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});

export default router;
