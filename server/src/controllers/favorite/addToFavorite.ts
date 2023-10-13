import User from '../../models/userModel';
import { addToFavoriteService } from '../../services/favorite/favorite.service';
import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validator from '../../middleware/validators/index';
/**
 * Adds or removes a pack from a user's favorites list and updates the corresponding pack's favorited_by array.
 * @param {Object} req - The request object containing the packId and userId properties in the body.
 * @param {Object} res - The response object used to send the HTTP response.
 * @return {Object} The updated user object in the response body.
 */
export const addToFavorite = async (c, next) => {
  const { packId, userId } = c.req.json();
  await addToFavoriteService(packId, userId);
  const user = await User.findOne({ _id: userId }).select('-password');
  if (!user) next(UserNotFoundError);
  res.locals.data = user;
  responseHandler(c);
};

export function addToFavoriteRoute() {
  return publicProcedure
    .input(validator.addToFavorite)
    .mutation(async (opts) => {
      const { packId, userId } = opts.input;
      await addToFavoriteService(packId, userId);
      const user = await User.findOne({ _id: userId }).select('-password');
      // if (!user) throw UserNotFoundError;
      if (!user) return UserNotFoundError;
      return user;
    });
}
