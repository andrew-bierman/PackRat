import { DbClient } from '../../db/client';
import { Item } from '../../drizzle/methods/Item';
import { VectorClient } from '../../vector/client';
import { item as ItemsTable } from '../../db/schema';
import { inArray } from 'drizzle-orm';

/**
 * Retrieves items that are similar to the provided item.
 *
 * @param {string} id - ID of the item for which to retrive similar items for.
 * @param {string} limit - Max number of similar items to return (default = 5).
 * @return {Promise<any[]>} A promise that resolves with an array of items.
 */
export async function getSimilarItemsService(id: string, limit: number = 5) {
  const itemObj = new Item();
  let item = await itemObj.findItem({
    id,
  });

  if (!item) {
    throw new Error(`Item with id: ${id} not found`);
  }

  const {
    result: { matches },
  } = await VectorClient.instance.search(item.name, 'items', limit, null);

  // passing empty array to the db query below throws
  if (!matches.length) {
    return [];
  }

  const similarItemsResult = await DbClient.instance
    .select()
    .from(ItemsTable)
    .where(
      inArray(
        ItemsTable.id,
        matches.map((m) => m.id),
      ),
    );

  // add similarity score to items result
  const similarItems = matches.map((match) => {
    return {
      ...similarItemsResult.find((item) => item.id == match.id),
      similarityScore: match.score,
    };
  });

  return similarItems;
}
