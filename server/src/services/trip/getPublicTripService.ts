// services/tripService.ts

import { PrismaClient } from '@prisma/client/edge';
import { Pack, User } from '../../prisma/methods';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getPublicTripsService = async (
  prisma: PrismaClient,
  queryBy: string,
): Promise<object[]> => {
  try {
    const publicTrips = await prisma.trip.findMany({
      where: { is_public: true },
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        weather: true,
        start_date: true,
        end_date: true,
        destination: true,
        owner_id: true,
        ownerDocument: {
          select: {
            id: true,
            username: true,
          },
        },
        packs: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: queryBy === 'Favorite' ? { id: 'desc' } : { id: 'asc' },
    });

    const allPacks = await prisma.pack.findMany({
      where: { id: { in: publicTrips.map((trip) => trip.packs) } },
    });

    const trips = publicTrips.map((trip) => {
      const ownerDocument = Array.isArray(trip.ownerDocument)
        ? trip.ownerDocument[0]
        : trip.ownerDocument;
      const packDocument = allPacks.find((pack) => pack.id === trip.packs);
      return {
        ...trip,
        packDocument: Pack(packDocument)?.toJSON(),
        ownerDocument: User(ownerDocument)?.toJSON(),
      };
    });

    return trips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
