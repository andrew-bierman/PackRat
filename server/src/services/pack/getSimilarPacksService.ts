import { DbClient } from '../../db/client';
import { Pack } from '../../drizzle/methods/pack';
import { VectorClient } from '../../vector/client';
import { pack as PacksTable } from '../../db/schema';
import { inArray } from 'drizzle-orm';

/**
 * Retrieves packs that are similar to the provided pack.
 *
 * @param {string} id - ID of the pack for which to retrive similar packs for.
 * @param {string} limit - Max number of similar packs to return.
 * @return {Promise<any[]>} An array of similar packs.
 */
export async function getSimilarPacksService(id: string, limit: number = 5) {
  const packClass = new Pack();
  let pack = await packClass.findPack({
    id,
  });

  if (!pack) {
    throw new Error(`Pack with id: ${id} not found`);
  }

  const { matches } = await VectorClient.instance.search(
    pack.name,
    'packs',
    limit,
  );

  const similarPacksResult = await DbClient.instance
    .select()
    .from(PacksTable)
    .where(
      inArray(
        PacksTable.id,
        matches.matches.map((m) => m.id),
      ),
    );

  // add similarity score to packs result
  const similarPacks = matches.matches.map((match) => {
    return {
      ...similarPacksResult.find((p) => p.id == match.id),
      similarityScore: match.score,
    };
  });

  return similarPacks;
}
