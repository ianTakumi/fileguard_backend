import User from "../models/user.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    // Get all users from the database
    const users = await User.find({ role: { $ne: "admin" } });

    // Return the users in the response
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Count all users for admin user
export const countAllUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});

    return res.status(200).json({
      user_count: userCount,
      message: "User count retrieved successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { id } = req.params;

    // Find the user by ID in the database
    const user = await User.findById(id);

    // Check if the user was not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user in the response
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the saved user in the response
    res.status(201).json({
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID and update it
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    // Check if the user does not exist
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user in the response
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
