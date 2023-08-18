import mongoose from "mongoose";
import User from "../../models/userModel";
import Conversation from "../../models/openai/conversationModel";

export const getUserChatsService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  let user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }

  const conversations = await Conversation.find({ userId }).exec();

  return { conversations };
};
