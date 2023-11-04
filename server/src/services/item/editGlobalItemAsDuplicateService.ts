import { prisma } from '../../prisma/index';
/**
 * Edits a global item by creating a duplicate item in a specific pack.
 *
 * @param {string} itemId - The ID of the item to be edited.
 * @param {string} packId - The ID of the pack where the duplicate item will be created.
 * @param {string} name - The name of the duplicate item.
 * @param {number} weight - The weight of the duplicate item.
 * @param {number} quantity - The quantity of the duplicate item.
 * @param {string} unit - The unit of measurement for the duplicate item.
 * @param {string} type - The type/category of the duplicate item.
 * @return {Promise<object>} The newly created duplicate item.
 */
export const editGlobalItemAsDuplicateService = async (
  itemId,
  packId,
  name,
  weight,
  quantity,
  unit,
  type,
) => {
  const category = await prisma.itemcategories.findFirst({
    where: {
      name: type,
    },
  });

  let newItem = await prisma.item.create({
    data: {
      name,
      weight,
      unit,
      quantity,
      global: false,
      category: {
        connect: { id: category.id },
      },
      packs: {
        connect: { id: packId },
      },
    } as any,
  });

  newItem = await prisma.item.findUnique({
    where: {
      id: newItem.id,
    },
    include: {
      category: true,
    } as never,
  });

  await prisma.pack.update({
    where: {
      id: packId,
    },
    data: {
      items: {
        connect: { id: newItem.id },
      } as any,
    },
  });

  await prisma.pack.update({
    where: {
      id: packId,
    },
    data: {
      items: {
        disconnect: { id: itemId },
      } as any,
    },
  });

  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      packs: {
        disconnect: { id: packId },
      },
    },
  });

  return newItem;
};
