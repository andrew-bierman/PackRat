// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';
import { Item } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';

/**
 * Edit an item in the service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} id - the ID of the item to be edited
 * @param {string} name - the new name of the item
 * @param {number} weight - the new weight of the item
 * @param {string} unit - the new unit of the item
 * @param {number} quantity - the new quantity of the item
 * @param {string} type - the new type of the item
 * @return {Promise<object>} - the edited item
 */
export const editItemService = async (
  id,
  name,
  weight,
  unit,
  quantity,
  type,
) => {
  const itemClass = new Item();
  const itemCategory = new ItemCategory();
  const category = await itemCategory.findUniqueItem({
    where: {
      name: type,
    },
  });

  const newItem = await itemClass.update({
    name,
    weight: Number(weight),
    unit,
    quantity: Number(quantity),
    categoryDocument: category.id,
    type,
  }, id);

  return newItem;
};
