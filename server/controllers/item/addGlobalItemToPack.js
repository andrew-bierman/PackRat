import Item from "../../models/itemModel.js";
import Pack from "../../models/packModel.js";

/**
 * Adds a global item to a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
export const addGlobalItemToPack = async (req, res) => {
    try {
      const { packId } = req.params;
      const { itemId } = req.body;
      const { ownerId } = req.body;
  
      const item = await Item.findById(itemId).populate("category", "name");
  
      await Pack.updateOne({ _id: packId }, { $addToSet: { items: item._id } });
  
      await Item.findByIdAndUpdate(
        item._id,
        {
          $addToSet: {
            owners: ownerId,
          },
        },
        { new: true }
      );
  
      await Item.findByIdAndUpdate(
        item._id,
        {
          $addToSet: {
            packs: packId,
          },
        },
        { new: true }
      );
  
      return res.status(200).json({ message: "succesfully updated", data: item });
    } catch (error) {
      res.status(404).json({ msg: "Items cannot be found" });
    }
  };