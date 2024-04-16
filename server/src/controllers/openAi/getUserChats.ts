import { publicProcedure } from '../../trpc';
import { getUserChatsService } from '../../services/openAi/openAi.service';
import { z } from 'zod';

/**
 * Retrieves the chats of a user.
 * @param {string} req.params.userId - The ID of the user.
 * @param {string} req.params.itemTypeId - The ID of the pack or trip.
 * @returns {object} The conversations of the user.
 */
export const getUserChats = async (req, res, next) => {
  try {
    const { userId, itemTypeId } = req.params;

    const result = await getUserChatsService(userId, itemTypeId);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(FailedToRetrieveUserChats);
  }
};


export function getUserChatsRoute() {
  return publicProcedure
    .input(z.object({ userId: z.string(), itemTypeId: z.string() }))
    .query(async (opts) => {
      const { userId, itemTypeId } = opts.input;
      return getUserChatsService(userId, itemTypeId);
    });
}
