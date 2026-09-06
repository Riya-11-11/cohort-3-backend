const express = require("express");
const userRoutes = require("../src/routes/user.routes");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/user", userRoutes);

module.exports = app;