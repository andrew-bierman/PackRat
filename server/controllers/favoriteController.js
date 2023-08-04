export const addToFavorite = async (req, res) => {
  try {
    const { packId } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPackFavorited = user.favorites.includes(packId);

    if (isPackFavorited) {
      user.favorites.pull(packId);
      await user.save();
      await Pack.updateOne({ _id: packId }, { $pull: { favorited_by: userId }, $inc: { favorites_count: -1 } });
    } else {
      user.favorites.push(packId);
      await user.save();
      await Pack.updateOne({ _id: packId }, { $push: { favorited_by: userId }, $inc: { favorites_count: 1 } });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ msg: "Failed to retrieve user favorites" });
  }
};

export const getFavoritePacksForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const packs = await Pack.find({ favorited_by: userId });

    res.status(200).json(packs);
  } catch (error) {
    res.status(500).json({ msg: "Failed to retrieve favorite packs for the user" });
  }
};
