import app from "./app/app.js";
import connectDB from "./config/db.js";

await connectDB(); //global await is used to wait for the database connection to be established before starting the server

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
