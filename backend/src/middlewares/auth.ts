import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// This is a declaration merging to add a new property to the Request interface (since it's not a default property)
declare global {
    namespace Express {
        interface Request {
        userId: string;
        }
    }
}

// This function will verify the token and add the userId to the request object
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth-token'];
  if(!token) {
    res.status(401).send({message: 'Unauthorized'});
  }

  try{
    // verify() is a jwt method that verifies the token
   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
   req.userId = (decoded as JwtPayload).userId;
   next();
  } catch (error) {
    res.status(401).send({message: 'Unauthorized'});
  }
}

export { verifyToken };