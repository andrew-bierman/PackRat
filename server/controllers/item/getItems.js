import Item from "../../models/itemModel.js";

/**
 * Retrieves a list of items associated with a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.packId - The ID of the pack to retrieve items for.
 * @return {Object} An array of items associated with the pack.
 */
export const getItems = async (req, res) => {
    try {
      const { packId } = req.params;
  
      const items = await Item.find({ packs: packId });
  
      return res.status(200).json(items);
    } catch (error) {
      res.status(404).json({ msg: "Items cannot be found" });
    }
  }; 