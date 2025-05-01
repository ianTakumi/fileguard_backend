import mongoose from "mongoose";

const { Schema } = mongoose;

// Defining the Contact schema
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Exporting the Contact model
export default Contact;
