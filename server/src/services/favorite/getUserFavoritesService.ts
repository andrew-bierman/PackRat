import User from "../../models/userModel";
import Pack from "../../models/packModel";
import { UserNotFoundError } from "../../helpers/errors";

/**
 * Retrieves the favorites of a user.
 *
 * @param {string} userId - The ID of the user.
 * @return {Favorite[]} An array containing the user's favorite items.
 */
export const getUserFavoritesService = async (userId,next) => {
    const user = await User.findById({ _id: userId }).populate("favorites");
    if (!user) next(UserNotFoundError);
    return user.favorites;
};