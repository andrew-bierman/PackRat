import { Item } from '../../drizzle/methods/Item';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemCategory as categories } from '../../utils/itemCategory';
import { type InsertItemCategory } from '../../db/schema';

/**
 * Edits a global item by creating a duplicate item in a specific pack.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be edited.
 * @param {string} packId - The ID of the pack where the duplicate item will be created.
 * @param {string} name - The name of the duplicate item.
 * @param {number} weight - The weight of the duplicate item.
 * @param {number} quantity - The quantity of the duplicate item.
 * @param {string} unit - The unit of measurement for the duplicate item.
 * @param {string} type - The type/category of the duplicate item.
 * @return {Promise<object>} The newly created duplicate item.
 */

type ItemType = MongooseDocument & {
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  name: string;
  packs: ObjectId[];
  quantity: number;
  unit: string;
  owners: ObjectId[];
  global: boolean;
  category?: ObjectId;
};

export const editGlobalItemAsDuplicateService = async (
  itemId: string,
  packId: string,
  name: string,
  weight: number,
  quantity: number,
  unit: string,
  type: string,
): Promise<object> => {
  let category: InsertItemCategory | null;
  if (!categories.includes(type)) {
    throw new Error(`Category must be one of: ${categories.join(', ')}`);
  }
  const itemClass = new Item();
  const itemCategoryClass = new ItemCategory();
  const ItemPacksClass = new ItemPacks();
  category = await itemCategoryClass.findItemCategory({ name: type });
  if (!category) {
    category = await itemCategoryClass.create({ name: type });
  }
  const newItem = await itemClass.create({
    name,
    weight,
    unit,
    quantity,
    global: false,
    categoryId: category.id,
  });

  // TODO update pack
  // await prisma.pack.update({
  //   where: {
  //     id: packId,
  //   },
  //   data: {
  //     itemDocuments: {
  //       newItem.id
  //     },
  //     disconnect: [{ id: itemId }, { id: packId }],
  //   },
  // },
  // });
  await ItemPacksClass.updateRelation({
    oldItemId: itemId,
    newItemId: newItem.id,
    packId,
  });

  return newItem;
};
