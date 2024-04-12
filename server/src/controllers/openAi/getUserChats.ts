import { publicProcedure } from '../../trpc';
import { getUserChatsService } from '../../services/openAi/openAi.service';
import { z } from 'zod';

/**
 * Retrieves the chats of a user.
 * @param {string} req.params.userId - The ID of the user.
 * @returns {object} The conversations of the user.
 */

export function getUserChatsRoute() {
  return publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      return await getUserChatsService(userId);
    });
}
