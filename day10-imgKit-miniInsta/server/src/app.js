import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/post.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/post", postRoutes);

export default app;
