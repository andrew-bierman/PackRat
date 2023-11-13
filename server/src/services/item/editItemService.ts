import { prisma } from '../../prisma';
/**
 * Edit an item in the service.
 *
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
  const category = await prisma.itemCategory.findFirst({
    where: {
      name: type,
    },
  });

  const newItem = await prisma.item.update({
    where: {
      id: id,
    },
    data: {
      name,
      weight,
      unit,
      quantity,
      category: {
        connect: { id: category.id },
      },
    },
    include: {
      category: true,
    },
  });

  return newItem;
};
