import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/UserController.js";

let router = express.Router();

// Registration
router.post("/register", createUser);

// Get all users
router.get("/", getUsers);

// Get a single user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Export the router
export default router;
