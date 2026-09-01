const express = require("express");
const connectDb = require("./config/db");
const NotesModel = require("./models/note.model");

const app = express();
app.use(express.json());

connectDb();

//we have to 50+ api
app.get("/", (req, res) => {
  res.send("done");
});

app.post("/create", async (req, res) => {
  let { title, description } = req.body;

  const newNote = await NotesModel.create({
    title,
    description,
  });
  // save in mongoDB

  res.send({
    success: true,
    message: "Note created successfully",
    data: newNote,
  });
});

//export app
module.exports = app;
