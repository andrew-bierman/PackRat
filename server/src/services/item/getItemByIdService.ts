import Item from "../../models/itemModel";

export const getItemByIdService = async (_id) => {
    const item = await Item.findById({ _id });
  
    return item;
  };