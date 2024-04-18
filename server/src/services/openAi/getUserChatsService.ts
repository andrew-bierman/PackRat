import { Conversation } from '../../drizzle/methods/Conversation';
import { User } from '../../drizzle/methods/User';

/**
 * Retrieves the user's chats based on their userId.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Object>} An object containing the user's conversations.
 * @throws {Error} If the userId is invalid or if the user is not found.
 */
export const getUserChatsService = async (userId, itemTypeId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error('User not found');
  }

  const conversations = await Conversation.find({ userId, itemTypeId }).exec();

  return { conversations };
};
