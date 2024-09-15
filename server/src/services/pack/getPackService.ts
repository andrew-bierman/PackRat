import { Pack } from '../../drizzle/methods/pack';
import { SORT_OPTIONS, DEFAULT_SORT, sortFunction } from '../../utils/pack';

export const getPacksService = async (
  ownerId: string,
  queryBy: string = 'createdAt',
  page: number,
  limit: number,
  excludePrivatePacks?: boolean,
) => {
  try {
    const packClass = new Pack();
    const sortOption = queryBy ? SORT_OPTIONS[queryBy] : DEFAULT_SORT;

    let packs = await packClass.findMany({
      sortOption,
      includeRelated: true,
      ownerId,
      is_public: excludePrivatePacks ? 1 : undefined,
      page, // Use page for pagination
      limit, // Use limit for pagination
    });

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
