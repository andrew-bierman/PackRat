import Item from "../../models/itemModel.js";

/**
 * Retrieves an item by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body._id - The ID of the item to retrieve.
 * @return {Object} The retrieved item.
 */
export const getItemById = async (req, res) => {
  try {
    const { _id } = req.body;

    const item = await Item.findById({ _id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ msg: "Item cannot be found" });
  }
};
