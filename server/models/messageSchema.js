const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation", // Reference to the Conversation model
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // Optional: for images, videos, etc.
    type: {
      type: String, // 'text', 'image', 'video'
      default: "text",
    },
    // Optional: if messages can be seen by others
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message=mongoose.model("Message",messageSchema);

module.exports=Message;
