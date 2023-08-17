import User from "../../models/userModel";
import Pack from "../../models/packModel";

export const addToFavoriteService = async (packId, userId) => {
    const exists = await User.find(
        { favorites: { $in: [packId] } },
        { _id: userId }
    );

    if (exists.length > 0) {
        await User.updateOne({ _id: userId }, { $pull: { favorites: packId } });
        await Pack.updateOne({ _id: packId }, { $pull: { favorited_by: userId } });
        await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: -1 } });
    } else {
        await User.updateOne({ _id: userId }, { $push: { favorites: packId } });
        await Pack.updateOne({ _id: packId }, { $push: { favorited_by: userId } });
        await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: 1 } });
    }
};
