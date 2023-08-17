import Item from "../../models/itemModel";


export const deleteGlobalItemService = async (itemId) => {
    const itemDeleted = await Item.findByIdAndDelete(itemId);
  
    return itemDeleted;
  };