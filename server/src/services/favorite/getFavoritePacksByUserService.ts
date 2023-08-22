import User from "../../models/userModel";
import Pack from "../../models/packModel";

/**
 * Retrieves the favorite packs associated with a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getFavoritePacksByUserService = async (userId) => {
    const packs = await Pack.find({ favorited_by: { $in: [userId] } });

    return packs;
};
