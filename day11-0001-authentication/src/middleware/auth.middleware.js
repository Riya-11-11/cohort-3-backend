import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization; //provide token

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  //   const data = jwt.decode(token); //provide data

  const data = jwt.verify(token, process.env.JWT_SECRET); //toke, jwt_secret
  //token agar server k jwt_secret k saath create kiya gya h to data dega but agr wo is jwt_secret yaani server k secret s nhi create kiya h to error de dega

  const user = await userModel.findById(data.id); //provide user from db;

  req.user = user; //user naam ki property create krenge req and and pass kr denge user m

  next();
};
