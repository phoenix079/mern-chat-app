const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "", // Optional: URL to profile picture
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    // Optional: if you plan to have admin users
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);


const User = mongoose.model("User", userSchema);
module.exports = User;
