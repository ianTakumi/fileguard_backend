import User from "../models/user.js";

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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
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
