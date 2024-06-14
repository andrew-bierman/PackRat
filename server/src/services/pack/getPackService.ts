import { Pack } from '../../drizzle/methods/pack';
import { SORT_OPTIONS, DEFAULT_SORT, sortFunction } from '../../utils/pack';

export const getPacksService = async (
  ownerId: string,
  queryBy: string = 'createdAt',
) => {
  try {
    const packClass = new Pack();
    const sortOption = queryBy ? SORT_OPTIONS[queryBy] : DEFAULT_SORT;
    let packs = await packClass.findMany({
      sortOption,
      includeRelated: true,
      ownerId,
    });

    // Apply sorting if necessary
    packs = await sortFunction({
      packs,
      queryBy,
      ownerId,
      sortItems: true,
    });

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
};
