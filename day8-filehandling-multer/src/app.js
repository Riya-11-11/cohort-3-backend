const express = require("express");
const fileRoute = require("./routes/file.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully!!!");
});

app.use("/file", fileRoute);

module.exports = app;
