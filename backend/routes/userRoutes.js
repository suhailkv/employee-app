const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CONSTANTS = require("../constants");
const router = express.Router();
const { singupValidation } = require("../middleware/validation");
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    CONSTANTS.JWT_SECRET,
    {
      expiresIn: CONSTANTS.TOKEN_EXPIRY,
    }
  );
};

router.post("/signup", singupValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
