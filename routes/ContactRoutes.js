import express from "express";
import {
  getContacts,
  countAllContacts,
  getContactById,
  createContact,
  updateContact,
} from "../controllers/ContactController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAccessMiddleware from "../middlewares/adminAccessMiddleware.js";

let router = express.Router();

// Count all contacts for admin user
router.get("/count", countAllContacts);

// Get all contacts
router.get("/", getContacts);

// Get a single contact by ID
router.get("/:id", getContactById);

// Create a new contact
router.post("/", createContact);

// Update a contact by ID
router.put("/:id", updateContact);

// Export the router
export default router;
