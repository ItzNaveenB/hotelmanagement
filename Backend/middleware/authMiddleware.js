const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authtoken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, "secret");
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
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