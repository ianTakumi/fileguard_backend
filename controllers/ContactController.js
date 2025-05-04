import Contact from "../models/contact.js";

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    // Get all contacts from the database
    const contacts = await Contact.find();

    // Return the contacts in the response
    res
      .status(200)
      .json({ message: "Contacts fetched successfully", data: contacts });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Count all contacts for admin user
export const countAllContacts = async (req, res) => {
  try {
    const contactCount = await Contact.countDocuments({});

    return res.status(200).json({
      contact_count: contactCount,
      message: "Contact count retrieved successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  try {
    // Get the contact details from the request body
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Create a new contact instance
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the new contact to the database
    const savedContact = await newContact.save();

    // Return the saved contact in the response
    res.status(201).json({
      message: "Contact created successfully",
      success: true,
      data: savedContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Update a contact by ID
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update the contact status
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // Check if the contact was found and updated
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Return the updated contact in the response
    res.status(200).json({
      message: "Contact updated successfully",
      success: true,
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
