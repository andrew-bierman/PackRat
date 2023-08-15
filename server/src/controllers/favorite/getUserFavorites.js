import User from "../../models/userModel.js";

/**
 * Retrieves the favorite items of a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} An array of favorite items belonging to the user.
 */
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