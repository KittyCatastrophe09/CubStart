const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// BEGIN PART 5

// END PART 5

// BEGIN PART 8

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      // YOUR CODE HERE
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});

// GET USER BY ID OR USERNAME
router.get("/", async (req, res) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    res.status(404).json(err);
  }
});

// GET FOLLOWING/FRIENDS
router.get("/friends/:userId", async (req, res) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    console.log(err);
  }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      // YOUR CODE HERE
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("Can't follow self");
  }
});

// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  /* YOUR CODE HERE */
});

// END PART 8

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      await User.findByIdAndDelete(req.body.userId);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});

module.exports = router;
