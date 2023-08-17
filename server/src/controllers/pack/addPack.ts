import { addPackService } from "../../services/pack/pack.service";

/**
 * Adds a new pack to the database.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Promise} A promise that resolves to the created pack.
 */
export const addPack = async (req, res) => {
  try {
    const { name, owner_id } = req.body;

    const result = await addPackService(name, owner_id);

    res.status(200).json({ msg: "success", ...result });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};