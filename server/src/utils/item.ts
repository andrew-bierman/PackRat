import Item from "../models/itemModel";

export const itemValidation = async ({
  name,
  weight,
  quantity,
  unit,
  packId,
}: any) => {
  if (!name || !weight || !quantity || !unit || !packId) {
    throw new Error("All fields must be filled");
  }

  const item = await Item.create({
    name,
    weight,
    quantity,
    unit,
    packId,
  });

  return item;
};
