import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
} from "../controllers/ContactController";
let router = express.Router();

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
