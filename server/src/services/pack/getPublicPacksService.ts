import { Pack } from '../../drizzle/methods/Pack';

const SORT_OPTIONS = {
  Favorite: { favorites_count: -1 },
  Lightest: { total_weight: 1 },
  Heaviest: { total_weight: -1 },
  'Most Items': { items_count: -1 },
  'Fewest Items': { items_count: 1 },
  Oldest: { createdAt: 1 },
  'Most Recent': { updatedAt: -1 },
  'Highest Score': { total_score: -1 },
  'Lowest Score': { total_score: 1 },
  'A-Z': { name: 1 },
  'Z-A': { name: -1 },
  'Most Owners': { 'owners.length': -1 },
};

const sortPacks = (propertyName, sortOrder) => (packA, packB) => {
  const valueA: number =
    propertyName !== 'owners.length'
      ? packA[propertyName]
      : packA.ownerDocuments.length;
  const valueB: number =
    propertyName !== 'owners.length'
      ? packB[propertyName]
      : packB.ownerDocuments.length;

  if (valueA < valueB) {
    return -1 * Number(sortOrder);
  } else if (valueA > valueB) {
    return 1 * Number(sortOrder);
  }

  return 0;
};

const computeVirtualFields = (pack) => {
  const packClass = new Pack();
  const packWithTotalWeight = packClass.computeTotalWeight(pack);
  const packWithTotalScore = packClass.computeTotalScores(packWithTotalWeight);
  const packWithFavoritesCount =
    packClass.computeFavouritesCount(packWithTotalScore);

  return {
    ...packWithFavoritesCount,
    favoritedByDocuments: pack.favoritedByDocuments,
    ownerDocuments: pack.ownerDocuments,
    ownerDocument: pack.ownerDocument,
    items_count: pack.items.length,
  };
};

// Default sorting in case none of the above keys match
// const DEFAULT_SORT = { _id: -1 };
const DEFAULT_SORT = { createdAt: -1 };

/**
 * Retrieves public packs based on the provided query parameter.
 *
 * @param {string} queryBy - Specifies how the public packs should be sorted.
 * @return {Promise<any[]>} An array of public packs.
 */
export async function getPublicPacksService(queryBy: string = null) {
  try {
    const sortOption = SORT_OPTIONS[queryBy] || DEFAULT_SORT;
    const [[propertyName, sortOrder]] = Object.entries(sortOption);
    const packClass = new Pack();
    const publicPacks = await packClass.findMany({
      where: (pack) => pack.is_public.eq(true),
      with: {
        favoritedByDocuments: {
          columns: {
            id: true,
            name: true,
          },
        },
        itemDocuments: {
          columns: {
            id: true,
            name: true,
          },
        },
        ownerDocument: {
          columns: {
            id: true,
            name: true,
          },
        },
        ownerDocuments: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    return publicPacks
      .map(computeVirtualFields)
      .sort(sortPacks(propertyName, sortOrder));
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
