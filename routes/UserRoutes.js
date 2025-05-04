import express from "express";
import {
  getUsers,
  countAllUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/UserController.js";

let router = express.Router();

// Count all users for admin dashboard
router.get("/count", countAllUsers);

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
