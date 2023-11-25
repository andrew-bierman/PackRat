// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

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
  prisma: PrismaClient,
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
      categoryDocument: {
        connect: { id: category.id },
      },
    },
    include: {
      categoryDocument: true,
    },
  });

  return newItem;
};
