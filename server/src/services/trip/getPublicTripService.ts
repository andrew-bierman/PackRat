// services/tripService.ts
import { prisma } from '../../prisma';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getPublicTripsService = async (
  queryBy: string,
): Promise<object[]> => {
  try {
    const trips = await prisma.trip.findMany({
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

    return trips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
