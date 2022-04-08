const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// BEGIN PART 5
const router = express.Router();

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
      await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
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
    const userId = req.query.userId;
    const username = req.query.username;
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    // _doc carries the entire document object in MongoDB. need to remove password and other extranneous information from the response.
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json(err);
  }
});

// GET FOLLOWING/FRIENDS
router.get("/friends/:userId", async (req, res) => {
  try {
    // YOUR CODE HERE
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      // Only unpack the properties we need, then push
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
  }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      // YOUR CODE HERE
      
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // If not already following
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } }); // Update both users involved using $push syntax
        await currentUser.updateOne({ $push: { following: req.params.id } }); // Update both users involved
        res.status(200).json("Followed user");
      } else {
        res.status(403).json("Already following");
      }
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
  if (req.body.userId !== req.params.id) {
    try {
      // YOUR CODE HERE
      
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // If not already following
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } }); // Update both users involved using $push syntax
        await currentUser.updateOne({ $push: { following: req.params.id } }); // Update both users involved
        res.status(200).json("Not Following user");
      } else {
        res.status(403).json("User unfollowed");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("Can't unfollow self");
  }
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
