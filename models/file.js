import mongoose from "mongoose";
// import { v2 as cloudinary } from "cloudinary";

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    type: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    nonce: {
      type: String,
      required: true,
    },
    ciphertext: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    shared_with: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        shared_date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

// Exporting the File model
export default File;
