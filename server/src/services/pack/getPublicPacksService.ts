import { prisma } from '../../prisma/index';

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

export async function getPublicPacksService(queryBy = null) {
  try {
    const packs = await prisma.pack.findMany({
      where: {
        is_public: true,
      },
      include: {
        items: true,
        owners: true,
      },
      orderBy: SORT_OPTIONS[queryBy] || DEFAULT_SORT,
    });

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
