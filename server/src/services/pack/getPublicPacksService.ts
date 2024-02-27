import { Pack } from '../../drizzle/methods/pack';
import { SORT_OPTIONS, DEFAULT_SORT, sortFunction } from '../../utils/pack';

/**
 * Retrieves public packs based on the provided query parameter.
 *
 * @param {string} queryBy - Specifies how the public packs should be sorted.
 * @return {Promise<any[]>} An array of public packs.
 */
export async function getPublicPacksService(queryBy?: string) {
  try {
    const packClass = new Pack();
    const sortOption = queryBy ? SORT_OPTIONS[queryBy] : DEFAULT_SORT;
    let packs = await packClass.findMany({
      sortOption,
      includeRelated: true,
      is_public: true,
    });

    // Apply sorting if necessary
    packs = await sortFunction({
      packs,
      queryBy,
      is_public: true,
      sortItems: true,
    });

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
