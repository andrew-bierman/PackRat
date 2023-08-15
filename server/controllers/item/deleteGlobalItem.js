import Item from "../../models/itemModel.js";

/**
 * Deletes a global item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
export const deleteGlobalItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const itemDeleted = await Item.findByIdAndDelete(itemId);

    res.status(200).json({
      data: itemDeleted,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to delete item " + error.message });
  }
};