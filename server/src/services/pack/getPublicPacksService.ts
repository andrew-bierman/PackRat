import { Pack } from '../../drizzle/methods/pack';
import { SORT_OPTIONS, DEFAULT_SORT } from '../../utils/pack';

/**
 * Retrieves public packs based on the provided query parameter.
 *
 * @param {string} queryBy - Specifies how the public packs should be sorted.
 * @return {Promise<any[]>} An array of public packs.
 */
export async function getPublicPacksService(queryBy?: string) {
  try {
    let packs;
    const packClass = new Pack();
    const sortOption = queryBy ? SORT_OPTIONS[queryBy] : DEFAULT_SORT;
    const isSortingByItems =
      queryBy && (queryBy === 'Most Items' || queryBy === 'Fewest Items');
    if (isSortingByItems) {
      packs = await packClass.sortPacksByItems({queryBy, is_public: true, sortItems: true});
    } else {
      packs = await packClass.findMany({
        sortOption,
        includeRelated: true,
        is_public: true,
      });
    }
    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
