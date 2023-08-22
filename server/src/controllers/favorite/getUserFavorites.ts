import { UserFavoritesNotFoundError } from "../../helpers/errors";
import User from "../../models/userModel";
import { getUserFavoritesService } from "../../services/favorite/favorite.service";

/**
 * Retrieves the favorite items of a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} An array of favorite items belonging to the user.
 */
export const getUserFavorites = async (req, res, next) => {
  const { userId } = req.params;
  const favorites = await getUserFavoritesService(userId,next);
  if (!favorites) next(UserFavoritesNotFoundError);
  res.status(200).json(favorites);
};
