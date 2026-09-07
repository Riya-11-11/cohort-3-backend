import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the authentication API",
  });
});

app.post("/api/auth/register", (req, res) => {
  const { email, name, password } = req.body; //database m store k\iya h

  const token = jwt.sign(
    {
      email,
      name,
      //_id
    },
    "1a89acb2cdfce61a78e1d61eabbf3e3f8bbc1d439b6c258f3bcf3d97ac8bd055",
  );

  res.status(201).json({
    message: "User created successfully",
    data: {
      user: {
        email,
        name,
      },
      token,
    },
  });
});

export default app;
