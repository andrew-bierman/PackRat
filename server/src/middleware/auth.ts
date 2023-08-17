import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request ,Response,NextFunction} from "express";

declare global {
  namespace Express {
      interface Request {
          user: any
          token: string
      }
  }
}

const auth = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token: any = req.header("Authorization")?.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, JWT_SECRET??"");
    const user: any = await User.findOne({
      _id: decoded._id,
      token: token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate" });
  }
};
export default auth;
