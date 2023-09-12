import { publicProcedure } from '../../trpc';
import { FailedToRetrieveUserChats } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getUserChatsService } from '../../services/openAi/openAi.service';
import * as validators from "@packrat/packages"
import { authorizedProcedure } from '../../middleware/authorizedProcedure';

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
  return authorizedProcedure.input(validators.getUserChats)
    .query(async (opts) => {
      const { userId } = opts.input;
      return getUserChatsService(userId);
    });
}