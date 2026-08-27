const express = require("express");

const app = express();

//".use"---> is the method which connect middleware, for acception JSOn data middleware used
app.use(express.json());

let port = 3000;

let users = [
  //   {
  //     name: "Riya",
  //     age: 20,
  //   },
];

//post---> Create
app.post("/create", (req, res) => {
  let body = req.body;
  users.push(body);
  res.send("Users send successfully!!!");
});

//get---> Read
app.get("/", (req, res) => {
  res.send(users);
});

//put---> Update
app.put("/update/:id", (req, res) => {
  // res.send("Will be update!!!");

  let { id } = req.params;
  let { Name } = req.body;

  let updatedUser = users.map((val) =>
    val.id === id ? { ...val, Name } : val,
  );

  res.send(updatedUser);
});

//Delete---> should have unique id
app.delete("/delete/:id", (req, res) => {
  let { id } = req.params;
  let userData = users.filter((val) => val.id !== id);
  users = userData;
  res.send(userData);
});

//server listen...
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
