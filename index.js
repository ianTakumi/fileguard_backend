import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
