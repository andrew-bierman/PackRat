import User from "../../models/userModel";
import Pack from "../../models/packModel";

export const getUserFavoritesService = async (userId) => {
    const user = await User.findById({ _id: userId }).populate("favorites");

    if (!user) return null;

    return user.favorites;
};