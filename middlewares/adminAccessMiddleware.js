import User from "../models/user.js";
import jwt from "jsonwebtoken";

const adminAccessMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = User.findById(decoded.id).select("-password -__v");

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.user = user;
  next();
};

export default adminAccessMiddleware;
