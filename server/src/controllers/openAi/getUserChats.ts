import { publicProcedure } from '../../trpc';
import { FailedToRetrieveUserChats } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getUserChatsService } from '../../services/openAi/openAi.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

/**
 * Retrieves the chats of a user.
 * @param {string} req.params.userId - The ID of the user.
 * @returns {object} The conversations of the user.
 */
export const getUserChats = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await getUserChatsService(userId);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(FailedToRetrieveUserChats);
  }
};

export function getUserChatsRoute() {
  return publicProcedure.input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      try {
        const { userId } = opts.input;
        return getUserChatsService(userId);
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: FailedToRetrieveUserChats.message });
      }
    });
}