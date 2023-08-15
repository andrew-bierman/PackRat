import User from "../../models/userModel.js";
import Pack from "../../models/packModel.js";

/**
 * Adds or removes a pack from a user's favorites list.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated user object.
 */
export const addToFavorite = async (req, res) => {
    try {
      const { packId, userId } = req.body;
  
      const exists = await User.find(
        { favorites: { $in: [packId] } },
        { _id: userId }
      );
  
      if (exists.length > 0) {
        await User.updateOne({ _id: userId }, { $pull: { favorites: packId } });
        await Pack.updateOne(
          { _id: packId },
          { $pull: { favorited_by: userId } }
        );
        await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: -1 } });
      } else {
        await User.updateOne({ _id: userId }, { $push: { favorites: packId } });
        await Pack.updateOne(
          { _id: packId },
          { $push: { favorited_by: userId } }
        );
        await Pack.updateOne({ _id: packId }, { $inc: { favorites_count: 1 } });
      }
  
      const user = await User.findOne({ _id: userId }).select("-password");
  
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };