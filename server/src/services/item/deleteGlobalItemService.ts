import Item from "../../models/itemModel.ts";


export const deleteGlobalItemService = async (itemId) => {
    const itemDeleted = await Item.findByIdAndDelete(itemId);
  
    return itemDeleted;
  };