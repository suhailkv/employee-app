// middleware/auth.js
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      CONSTANTS.JWT_SECRET
    );
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
