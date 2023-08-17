import Item from "../../models/itemModel";

export const getItemsService = async (packId) => {
  const items = await Item.find({ packs: packId });

  return items;
};