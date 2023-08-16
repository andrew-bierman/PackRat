import Item from "../../models/itemModel.ts";

export const getItemsService = async (packId) => {
  const items = await Item.find({ packs: packId });

  return items;
};