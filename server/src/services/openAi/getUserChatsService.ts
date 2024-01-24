import { Conversation } from '../../drizzle/methods/Conversation';
import { User } from '../../drizzle/methods/User';

/**
 * Retrieves the user's chats based on their userId.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Object>} An object containing the user's conversations.
 * @throws {Error} If the userId is invalid or if the user is not found.
 */
export const getUserChatsService = async (userId: string): Promise<object> => {
  const conversationClass = new Conversation();
  const userClass = new User();
  const user = await userClass.findUser({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  const conversations = await conversationClass.findMany(userId);

  return { conversations };
};
