import express from "express"; //"type": "module"
import cors from "cors"; //browser security feature
import path from "path"; //helps you work with file and directory paths in a cross‑platform way.

import { connectDb } from "./src/config/db.js";
import noteRoutes from "./src/routes/noteRoutes.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

import dotenv from "dotenv";
dotenv.config();

const app = express(); //to listen to a PORT, Creates an Express application instance.
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); //returns the current working directory

//MIDDLEWARE
// for CORS should be placed before ratelimiter
// CORS only required dsuring development
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json()); //to get {title,content} from req.body
app.use(rateLimiter);
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//to connect to MongoDB using mongoose.connect()
connectDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log("SERVER started on port: 5001");
  });
});

// git init
// git add .
// git commit -m "rate limit changed"
// git push

// in render
// new web service
// npm run build
// npm run start
// copy all env variables
