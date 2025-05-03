import express from "express";
import {
  checkUniqueEmail,
  login,
  register,
  requestPasswordReset,
  resetPassword,
} from "../controllers/AuthController.js";
let router = express.Router();

// Login
router.post("/login", login);

// Register
router.post("/register", register);

// Request password reset
router.post("/request-password-reset", requestPasswordReset);

// Reset password
router.post("/reset-password", resetPassword);

// Check unique email
router.get("/check-unique-email/:email", checkUniqueEmail);

export default router;
