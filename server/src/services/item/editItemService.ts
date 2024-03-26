import Item from '../../models/itemModel';
import { ItemCategoryModel } from '../../models/itemCategory';
import { ItemCategoryEnum } from '../../utils/itemCategory';

/**
 * Edit an item in the service.
 *
 * @param {_id} _id - the ID of the item to be edited
 * @param {string} name - the new name of the item
 * @param {number} weight - the new weight of the item
 * @param {string} unit - the new unit of the item
 * @param {number} quantity - the new quantity of the item
 * @param {string} type - the new type of the item
 * @return {Promise<object>} - the edited item
 */
export const editItemService = async (
  _id,
  name,
  weight,
  unit,
  quantity,
  type,
) => {
  const category = await ItemCategoryModel.findOne({
    name: ItemCategoryEnum[type],
  });

  if (!category) {
    throw new Error(`No category found with name: ${type}`);
  }

  const newItem = await Item.findOneAndUpdate(
    { _id },
    {
      name,
      weight,
      unit,
      quantity,
      category: category.id,
    },
    {
      returnOriginal: false,
    },
  ).populate('category', 'name');

  return newItem;
};
