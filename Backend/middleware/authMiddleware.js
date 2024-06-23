require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticateUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: "Unauthorized: Malformed token" });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('JWT Error:', error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

exports.checkAdminRole = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Unauthorized: Admin role required" });
  }
  next();
};
