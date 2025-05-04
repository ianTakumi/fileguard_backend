import {
  getAllFilesBasedOnUser,
  countAllFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
} from "../controllers/FileController.js";

import express from "express";

let router = express.Router();

// Count all files for admin user
router.get("/count", countAllFiles);

// Get all files for a user
router.get("/:userId", getAllFilesBasedOnUser);

// Get a file by ID
router.get("/file/:fileId", getFileById);

// Create a new file document
router.post("/create", createFile);

// Update a file document
router.put("/update/:fileId", updateFile);

// Delete a file document
router.delete("/delete/:fileId", deleteFile);

export default router;
