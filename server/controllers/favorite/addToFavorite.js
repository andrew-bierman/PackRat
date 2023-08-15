import User from "../../models/userModel.js";
import Pack from "../../models/packModel.js";

<<<<<<< HEAD:server/controllers/favoriteController.js
// Function to add or remove a pack from the user's favorites
=======
/**
 * Adds or removes a pack from a user's favorites list and updates the corresponding pack's favorited_by and favorites_count fields.
 * @param {Object} req - The request object containing the packId and userId properties in the body.
 * @param {Object} res - The response object used to send the HTTP response.
 * @return {Object} The updated user object in the response body.
 */
>>>>>>> andrew_testing:server/controllers/favorite/addToFavorite.js
export const addToFavorite = async (req, res) => {
  try {
    const { packId, userId } = req.body;

    // Check if the pack already exists in the user's favorites
    const exists = await User.find(
      { favorites: { $in: [packId] } },
      { _id: userId }
    );

    // If the pack exists in the user's favorites, remove it; otherwise, add it to the favorites
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

    // Get the user data after the update and exclude the password field from the response
    const user = await User.findOne({ _id: userId }).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

<<<<<<< HEAD:server/controllers/favoriteController.js
// Function to get the user's favorite packs
export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params; // Change from req.body to req.params

    // Find the user by their ID and populate the "favorites" field to get the favorite packs' details
    const user = await User.findById({ _id: userId }).populate("favorites");

    // If the user is not found, throw an error
    if (!user) throw new Error("User not found");

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(404).json({ msg: "User favorites cannot be found" });
  }
};

// Function to get packs favorited by a specific user
export const getFavoritePacksByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find packs that are favorited by the specified user
    const packs = await Pack.find({ favorited_by: { $in: [userId] } });

    // If no packs are found, throw an error
    if (!packs) throw new Error("Packs not found");

    res.status(200).json(packs);
  } catch (error) {
    res.status(404).json({ msg: "Packs cannot be found" });
  }
};
=======
>>>>>>> andrew_testing:server/controllers/favorite/addToFavorite.js
