// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';
import { ItemOwners } from '../../drizzle/methods/ItemOwners';
import { scorePackService } from '../pack/scorePackService';

interface UpdateItemPacksServiceParm {
  itemId: string;
  packId: string;
}

export const toggleItemPackService = async ({
  itemId,
  packId,
}: UpdateItemPacksServiceParm) => {
  const itemClass = new Item();
  const itemPacksClass = new ItemPacks();
  const item = await itemClass.findItem({
    id: itemId,
  });
  if (!item) {
    throw new Error('Item does not exist!');
  }

  await itemPacksClass.toggle(itemId, packId);
};
