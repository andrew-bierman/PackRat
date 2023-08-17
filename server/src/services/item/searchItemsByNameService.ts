import Item from "../../models/itemModel.ts";

export const searchItemsByNameService = async (name) => {
    const items = await Item.find({
      name: { $regex: `.*${name}.*`, $options: "i" },
    });
  
    return items;
  };
  
  