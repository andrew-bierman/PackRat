import { PrismaClient } from '@prisma/client/edge';
import { User, Item } from '../../prisma/methods';

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
  prisma: PrismaClient,
  ownerId,
  queryBy = null,
) => {
  try {
    const packs = await prisma.pack.findMany({
      where: {
        OR: [
          {
            owner_id: ownerId,
          },
          {
            owners: { has: ownerId },
          },
        ],
      },
      include: {
        itemDocuments: {
          select: {
            categoryDocument: {
              select: {
                name: true,
              },
            },
          },
        },
        ownerDocuments: true,
      },
      orderBy: SORT_OPTIONS[queryBy] || DEFAULT_SORT,
    });

    packs.forEach((pack) => {
      pack.ownerDocuments = pack.ownerDocuments?.map(
        (owner) => User(owner)?.toJSON(),
      ) as any;
      pack.itemDocuments = pack.itemDocuments?.map(
        (item) => Item(item as any)?.toJSON(),
      ) as any;
    });

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
};
