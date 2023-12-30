import Item from '../../models/itemModel';
import Pack from '../../models/packModel';
import { ItemCategoryModel } from '../../models/itemCategory';
import { ItemCategoryEnum } from '../../utils/itemCategory';

/**
 * Generates a new item and adds it to a pack based on the given parameters.
 *
 * @param {string} name - The name of the item.
 * @param {number} weight - The weight of the item.
 * @param {number} quantity - The quantity of the item.
 * @param {string} unit - The unit of measurement for the item.
 * @param {string} packId - The ID of the pack to add the item to.
 * @param {string} type - The category type of the item.
 * @param {string} ownerId - The ID of the owner of the item.
 * @return {object} An object containing the newly created item and the pack ID.
 */
export const addItemService = async (
  name,
  weight,
  quantity,
  unit,
  packId,
  type,
  ownerId,
) => {
  let newItem = null;
  const category = await ItemCategoryModel.findOne({
    name: ItemCategoryEnum[type],
  });

  newItem = await Item.create({
    name,
    weight,
    quantity,
    unit,
    packs: [packId],
    category: category? category._id : null,
  });

   
  await Pack.updateOne({ _id: packId }, { $addToSet: { items: newItem._id } });

  const updatedItem = await Item.findByIdAndUpdate(
    newItem._id,
    {
      $addToSet: {
        owners: ownerId,
      },
    },
    { new: true },
  ).populate('category');

  return { newItem: updatedItem, packId };
};
