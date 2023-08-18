import { getPacksService } from "../../services/pack/pack.service";

/**
 * Retrieves packs associated with a specific owner.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise} - Array of packs.
 */
export const getPacks = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const packs = await getPacksService(ownerId);

    res.status(200).json(packs);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ msg: "Packs cannot be found " + error.message });
  }
};