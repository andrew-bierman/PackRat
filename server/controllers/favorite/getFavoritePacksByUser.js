import Pack from "../../models/packModel.js";

/**
 * Retrieves favorite packs for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} - The favorite packs of the user.
 */
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
