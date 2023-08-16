import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";

/**
 * Deletes an item from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The deleted item.
 */
export const deleteItem = async (req, res) => {
    try {
      const { itemId } = req.body;
      const { packId } = req.body;
      let itemDeleted;
  
      const item = await Item.findById(itemId);
  
      if (item.global) {
        // remove the item from pack list
        await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });
        //update the individual item
  
        await Item.updateOne(
          {
            _id: itemId,
          },
          {
            $pull: {
              packs: packId,
            },
          }
        );
        itemDeleted = await Item.findById(itemId);
      } else {
        itemDeleted = await Item.findByIdAndDelete({ _id: itemId });
      }
  
      res.status(200).json(itemDeleted);
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: "Unable to delete item" + error.message });
    }
  };