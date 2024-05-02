import { Conversation } from '../../drizzle/methods/Conversation';
import { User } from '../../drizzle/methods/User';
// import mongoose from 'mongoose';
// import User from '../../models/userModel';
// import Conversation from '../../models/openai/conversationModel';

/**
 * Retrieves the user's chats based on their userId.
 * @param {string} userId - The ID of the user.
 * @param {string} itemTypeId - The ID of the item.
 * @return {Promise<Object>} An object containing the user's conversations.
 * @throws {Error} If the userId is invalid or if the user is not found.
 */
export const getUserChatsService = async (userId, itemTypeId) => {
  const user = await new User().findUser({ userId });
  if (!user) {
    throw new Error('User not found');
  }

  const conversation = new Conversation();
  const conversations = await conversation.findConversation(userId, itemTypeId);

  return { conversations };
};
