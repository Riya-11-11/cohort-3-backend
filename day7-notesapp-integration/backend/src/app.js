const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const notesRoute = require("./routes/notes.route");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

connectDb();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Okk, got it!!!");
});

app.use("/notes", notesRoute);

module.exports = app;
