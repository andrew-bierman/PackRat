import { type Pack } from '../../db/schema';
import { Pack as PackRepository } from '../../drizzle/methods/pack';
import { VectorClient } from '../../vector/client';

interface SimilarPack extends Pack {
  similarityScore: number;
}

/**
 * Retrieves packs that are similar to the provided pack.
 *
 * @param {string} id - ID of the pack for which to retrive similar packs for.
 * @param {string} limit - Max number of similar packs to return.
 * @return {Promise<SimilarPack[]>} An array of similar packs.
 */
export async function getSimilarPacksService(
  id: string,
  limit: number = 5,
): Promise<SimilarPack[]> {
  const packRepository = new PackRepository();
  const pack = await packRepository.findPack({
    id,
  });

  if (!pack) {
    throw new Error(`Pack with id: ${id} not found`);
  }

  const {
    result: { matches },
  } = await VectorClient.instance.search(pack.name, 'packs', limit, {
    isPublic: true,
  });

  // passing empty array to the db query below throws
  if (!matches.length) {
    return [];
  }

  const array: string[] = [];
  for (const m of matches) {
    if (m.id == id) continue; // filter current pack's id
    array.push(m.id);
  }

  const similarPacksResult = await packRepository.findAllInArray(array);

  // add similarity score to packs result
  const similarPacks = similarPacksResult.map((similarPack) => ({
    ...similarPack,
    similarityScore: matches.find((m) => m.id == similarPack.id)?.score ?? 0,
  }));

  return similarPacks;
}
