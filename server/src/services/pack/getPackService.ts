import { Pack } from '../../drizzle/methods/pack';
import { SORT_OPTIONS, DEFAULT_SORT } from '../../utils/pack';

export const getPacksService = async (ownerId: string, queryBy?: string) => {
  try {
    let packs;
    const packClass = new Pack();
    const sortOption = queryBy ? SORT_OPTIONS[queryBy] : DEFAULT_SORT;
    const isSortingByItems =
      queryBy && (queryBy === 'Most Items' || queryBy === 'Fewest Items');
    if (isSortingByItems) {
      packs = await packClass.sortPacksByItems({queryBy, ownerId, sortItems: true});
    } else {
      packs = await packClass.findMany({
        sortOption,
        includeRelated: true,
        ownerId,
      });
    }
    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
};
