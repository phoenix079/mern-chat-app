const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    //for group chats
    isGroupChat: { type: Boolean, default: false },
    groupName: {
      type: String,
      trim: true,
      required: function () {
        return this.isGroupChat;
      }, // Required if it's a group chat
    },
    // This 'users' field here seems redundant if 'participants' already serves the purpose of members.
    // If 'users' is meant for something else (e.g., just active users in the chat room without being participants in conversation),
    // then clarify its purpose. Otherwise, consider removing it or renaming 'participants' to 'users'.
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.isGroupChat;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Chat=mongoose.model("Conversation",conversationSchema);

module.exports = Chat;