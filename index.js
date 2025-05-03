import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/AuthRoutes.js";
import fileRoutes from "./routes/FileRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/contact", contactRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT} & connected to mongoDB`
      );
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
