import { Pack } from '../../drizzle/methods/pack';

const SORT_OPTIONS = {
  Favorite: { favoritesCount: 'desc' },
  Lightest: { totalWeight: 'asc' },
  Heaviest: { totalWeight: 'desc' },
  'Most Items': { itemsCount: 'desc' },
  'Fewest Items': { itemsCount: 'asc' },
  Oldest: { createdAt: 'asc' },
  'Most Recent': { updatedAt: 'desc' },
  'Highest Score': { scores: { totalScore: 'desc' } },
  'Lowest Score': { scores: { totalScore: 'asc' } },
  'A-Z': { name: 'asc' },
  'Z-A': { name: 'desc' },
  'Most Owners': { owners: 'desc' },
};

const DEFAULT_SORT = { createdAt: 'desc' };

export const getPacksService = async (
  ownerId,
  queryBy = null,
) => {
  try {
    const packClass = new Pack();
    const packs = await packClass.findMany({
      where: (pack, { or, eq }) => or(eq(pack.owner_id, ownerId), pack.owners.has(ownerId)),
      with: {
        itemDocuments: {
          columns: {
            categoryDocument: {
              columns: { name: true }
            }
          }
        },
        ownerDocuments: true
      },
      orderBy: (pack, { asc, desc }) => SORT_OPTIONS[queryBy] ? SORT_OPTIONS[queryBy](pack) : DEFAULT_SORT[pack]
    });

    packs.forEach((pack) => {
      pack.ownerDocuments = pack.ownerDocuments
      pack.itemDocuments = pack.itemDocuments
    });

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
};
