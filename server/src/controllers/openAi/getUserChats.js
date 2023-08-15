import mongoose from "mongoose";
import User from "../../models/userModel.ts";
import Conversation from "../../models/openai/conversationModel.ts";

/**
 * Retrieves the chats of a user.
 * @param {string} req.params.userId - The ID of the user.
 * @returns {object} The conversations of the user.
 */
export const getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const conversations = await Conversation.find({ userId }).exec();

    res.json({ conversations: conversations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user chats." });
  }
};