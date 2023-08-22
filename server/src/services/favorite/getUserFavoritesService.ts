import User from "../../models/userModel";
import Pack from "../../models/packModel";
import { UserNotFoundError } from "../../helpers/errors";

export const getUserFavoritesService = async (userId,next) => {
    const user = await User.findById({ _id: userId }).populate("favorites");
    if (!user) next(UserNotFoundError);
    return user.favorites;
};