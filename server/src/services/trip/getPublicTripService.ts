// services/tripService.ts

import { PrismaClient } from '@prisma/client/edge';

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
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
        packs: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: queryBy === 'Favorite' ? { id: 'desc' } : { id: 'asc' },
    });

    const trips = publicTrips.map((trip) => {
      const owner = Array.isArray(trip.owner) ? trip.owner[0] : trip.owner;
      return {
        ...trip,
        owner,
      };
    });

    return trips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
