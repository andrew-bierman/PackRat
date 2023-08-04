import User from "../models/userModel.js";
import Pack from "../models/packModel.js";


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

export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params; // Change from req.body to req.params

    const user = await User.findById({ _id: userId }).populate("favorites");

    if (!user) throw new Error("User not found");

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(404).json({ msg: "User favorites cannot be found" });
  }
};

export const getFavoritePacksByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const packs = await Pack.find({ favorited_by: { $in: [userId] } });

    if (!packs) throw new Error("Packs not found");

    res.status(200).json(packs);
  } catch (error) {
    res.status(404).json({ msg: "Packs cannot be found" });
  }
};
