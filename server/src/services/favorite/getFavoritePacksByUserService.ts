import User from "../../models/userModel.ts";
import Pack from "../../models/packModel.ts";

export const getFavoritePacksByUserService = async (userId) => {
    const packs = await Pack.find({ favorited_by: { $in: [userId] } });

    return packs;
};
