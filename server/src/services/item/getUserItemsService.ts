import { Item } from '../../drizzle/methods/Item';

export const getUserItemsService = async (
  reqlimit: number,
  reqpage: number,
  { searchString, ownerId }: { searchString: string; ownerId: string },
) => {
  const itemClass = new Item();
  const totalItems = await itemClass.count();
  const limit = Number(reqlimit) || totalItems;
  const totalPages = Math.ceil(totalItems / limit);
  const page = Number(reqpage) || 1;
  const offset = (page - 1) * limit;

  const items = await itemClass.findUserItems(ownerId, searchString, {
    limit,
    offset,
  });

  return {
    items,
    page,
    totalPages,
  };
};
