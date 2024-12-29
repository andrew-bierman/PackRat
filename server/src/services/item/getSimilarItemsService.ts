import { ITEM_TABLE_NAME, type Item } from '../../db/schema';
import { Item as ItemRepository } from '../../drizzle/methods/Item';
import { VectorClient } from '../../vector/client';
import { summarizeItem } from '../../utils/item';

export interface SimilarItem extends Item {
  similarityScore: number;
}

/**
 * Retrieves items that are similar to the provided item.
 *
 * @param {string} id - ID of the item for which to retrive similar items for.
 * @param {string} limit - Max number of similar items to return (default = 5).
 * @return {Promise<SimilarItem[]>} A promise that resolves with an array of items.
 */
export async function getSimilarItemsService(
  id: string,
  limit: number = 5,
): Promise<SimilarItem[]> {
  const itemRepository = new ItemRepository();
  const item = await itemRepository.findItem({
    id,
  });

  if (!item) {
    throw new Error(`Item with id: ${id} not found`);
  }

  const {
    result: { matches },
  } = await VectorClient.instance.search(
    summarizeItem(item),
    ITEM_TABLE_NAME,
    limit,
    {
      isPublic: true,
    },
  );

  // passing empty array to the db query below throws
  if (!matches.length) {
    return [];
  }

  const array: string[] = [];
  for (const m of matches) {
    if (m.id == id) continue; // filter current items's id
    array.push(m.id);
  }

  const similarItemsResult = await itemRepository.findAllInArray(array);

  // add similarity score to items result
  const similarItems = similarItemsResult.map((similarItem) => ({
    ...similarItem,
    similarityScore: matches.find((m) => m.id == similarItem.id)?.score || 0,
  }));

  return similarItems;
}
