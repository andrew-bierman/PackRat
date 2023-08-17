import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";


export const deleteItemService = async (itemId, packId) => {
    let itemDeleted;
  
    const item = await Item.findById(itemId);
  
    if (item.global) {
      await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });
  
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
  
    return itemDeleted;
  };