const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// BEGIN PART 5

// END PART 5

// BEGIN PART 6

// REGISTRATION
router.post("/register", async (req, res) => {
  try {
    // PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER

    // SAVE NEW USER INTO MONGODB
  } catch (err) {
    console.log(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    const attemptPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // VALIDATE PASSWORD
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// END PART 6

module.exports = router;
