import User from "../../models/userModel";
import Pack from "../../models/packModel";

export const getFavoritePacksByUserService = async (userId) => {
    const packs = await Pack.find({ favorited_by: { $in: [userId] } });

    return packs;
};
