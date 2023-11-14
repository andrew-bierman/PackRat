import { prisma } from "../../prisma/index";

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

export const getPacksService = async (ownerId, queryBy = null) => {
  try {
    const packs = await prisma.pack.findMany({
      where: {
        owners: { some: { id: ownerId } },
      },
      include: {
        items: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        owners: true,
      },
      orderBy: SORT_OPTIONS[queryBy] || DEFAULT_SORT,
    } as any);

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
};
