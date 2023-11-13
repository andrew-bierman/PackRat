import { prisma } from '../../prisma';

/**
 * Retrieves the user's chats based on their userId.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<Object>} An object containing the user's conversations.
 * @throws {Error} If the userId is invalid or if the user is not found.
 */
export const getUserChatsService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId },
  });

  return { conversations };
};
