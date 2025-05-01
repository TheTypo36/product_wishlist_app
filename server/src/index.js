import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./DB/index.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
dbConnect().then(() => {
  app.on("error", (error) => {
    console.log("error in connection of database ", error);
  });
});
const port = process.env.PORT || 8081;

app.get("/", (req, res) => {
  res.send(`<h1>hello world</h1>`);
});

import userRoutes from "./Routes/userRoutes.js";
import wishlistRoutes from "./Routes/wishlistRoutes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.listen(port, () => {
  console.log("server is running at", port);
});
