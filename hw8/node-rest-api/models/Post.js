const mongoose = require("mongoose");

// BEGIN PART 4

const PostSchema = new mongoose.Schema(
  {
    /* YOUR CODE HERE */
  },
  { timestamps: true }
);

// END PART 4

module.exports = mongoose.model("Post", PostSchema);
