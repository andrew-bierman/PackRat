import { PrismaClient } from '@prisma/client/edge';
import { Pack, User } from '../../prisma/methods';
import {
  computeFavouritesCount,
  computeTotalScores,
  computeTotalWeight,
} from '../../prisma/virtuals';

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
  console.log('Begin');
  const packWithTotalWeight = computeTotalWeight(pack);
  console.log('packWithTotalWeight');
  const packWithTotalScore = computeTotalScores(packWithTotalWeight);
  console.log('packWithTotalScore');
  const packWithFavoritesCount = computeFavouritesCount(packWithTotalScore);
  console.log('packWithFavoritesCount');

  return {
    ...packWithFavoritesCount,
    favoritedByDocuments: pack.favoritedByDocuments.map(
      (user) => User(user)?.toJSON(),
    ),
    ownerDocuments: pack.ownerDocuments.map((owner) => User(owner)?.toJSON()),
    ownerDocument: User(pack.ownerDocument)?.toJSON(),
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
export async function getPublicPacksService(
  prisma: PrismaClient,
  queryBy: string = null,
) {
  try {
    const sortOption = SORT_OPTIONS[queryBy] || DEFAULT_SORT;
    const [[propertyName, sortOrder]] = Object.entries(sortOption);

    const publicPacks = await prisma.pack.findMany({
      where: {
        is_public: true,
      },
      include: {
        favoritedByDocuments: true,
        itemDocuments: true,
        ownerDocument: true,
        ownerDocuments: true,
      },
    });

    // console.log('publicPacks', publicPacks[0]);

    return publicPacks
      .map(computeVirtualFields)
      .sort(sortPacks(propertyName, sortOrder));
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
