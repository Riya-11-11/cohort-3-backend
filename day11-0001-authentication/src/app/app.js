import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { authenticate } from "../middleware/auth.middleware.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the authentication API",
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { email, name, password } = req.body; //database m store kiya h

  const user = await userModel.create({
    email,
    name,
    password: await bcrypt.hash(password, 10), //paassword hash ho jaayega aur jitna bada no. choose krte h utna jyada wo secure hoga, but space v jyada leta h
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "User created successfully",
    data: {
      user: {
        email,
        name,
        id: user._id,
      },
      token,
    },
  });
});

app.get("/api/auth/me", authenticate, async (req, res) => {
  //authenticate--->middleware

  console.log(req.user);

  res.status(200).json({
    data: {
      user: req.user,
    },
  });
});

export default app;
