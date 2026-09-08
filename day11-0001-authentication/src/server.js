import app from "./app/app.js";
import { connectDB } from "./config/db.js";

await connectDB(); //jb tk mera server db s na connect ho tab tak aage execute nhi hoga

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
