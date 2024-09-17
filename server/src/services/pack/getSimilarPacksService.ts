import { DbClient } from '../../db/client';
import { Pack } from '../../drizzle/methods/pack';
import { VectorClient } from '../../vector/client';
import { pack as PacksTable } from '../../db/schema';
import { inArray } from 'drizzle-orm';
import { PackAndItemVisibilityFilter } from '@packrat/shared-types';

/**
 * Retrieves packs that are similar to the provided pack.
 *
 * @param {string} id - ID of the pack for which to retrive similar packs for.
 * @param {string} limit - Max number of similar packs to return.
 * @return {Promise<any[]>} An array of similar packs.
 */
export async function getSimilarPacksService(
  id: string,
  limit: number = 5,
  visibility: PackAndItemVisibilityFilter,
) {
  const packClass = new Pack();
  const pack = await packClass.findPack({
    id,
  });

  if (!pack) {
    throw new Error(`Pack with id: ${id} not found`);
  }

  const {
    result: { matches },
  } = await VectorClient.instance.search(
    pack.name,
    'packs',
    limit,
    visibility == PackAndItemVisibilityFilter.ALL
      ? undefined
      : {
          isPublic: visibility == PackAndItemVisibilityFilter.PUBLIC,
        },
  );

  // passing empty array to the db query below throws
  if (!matches.length) {
    return [];
  }

  const similarPacksResult = await DbClient.instance
    .select()
    .from(PacksTable)
    .where(
      inArray(
        PacksTable.id,
        matches.map((m) => m.id),
      ),
    );

  // add similarity score to packs result
  const similarPacks = similarPacksResult.map((similarPack) => ({
    ...similarPack,
    similarityScore: matches.find((m) => m.id == similarPack.id).score,
  }));

  return similarPacks;
}
