let https = require("http");

let server = https.createServer((req, res) => {
  if (req.url === "/users") {
    res.end("I am in users");
  }

//   res.end("get it"); //will see this on browser
});

server.listen(3000, () => {
  console.log("Server is running");
});
