import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password.trim());

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = user.getJwtToken();
    const refreshToken = user.getRefreshToken();

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevent access to cookie via JavaScript
      secure: process.env.NODE_ENV === "production", // Use 'secure' flag in production (HTTPS)
      sameSite: "Strict", // Prevent CSRF attacks
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevent access to cookie via JavaScript
      secure: process.env.NODE_ENV === "production", // Use 'secure' flag in production (HTTPS)
      sameSite: "Strict", // Prevent CSRF attacks
    });

    return res.status(200).json({
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    await newUser.save();

    const accessToken = newUser.getJwtToken();
    const refreshToken = newUser.getRefreshToken();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Check unique email
export const checkUniqueEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "A valid email is required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (user) {
      return res.status(409).json({ message: "Email already exists" }); // 409 is more semantically accurate
    }

    return res.status(200).json({ message: "Email is available" });
  } catch (err) {
    console.error("Email check error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // Check if refresh token is provided
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify the refresh token and get the user ID
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const userId = decoded.id;
    // console.log("User ID from refresh token:", userId);

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new access token
    const newAccessToken = user.getJwtToken();
    const newRefreshToken = user.getRefreshToken();

    // Set the new access token in the cookies
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Set the new refresh token in the cookies
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Send the new access token in the response
    return res.status(200).json({
      message: "Token refreshed successfully",
      user,
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
