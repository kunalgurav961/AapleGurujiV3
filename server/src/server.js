import app from "./app/app.js";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
config();
await connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port 3000");
});
