const mongoose = require("mongoose");

// BEGIN PART 4

const UserSchema = new mongoose.Schema(
  {
    /* YOUR CODE HERE */
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);

// END PART 4

module.exports = mongoose.model("User", UserSchema);
