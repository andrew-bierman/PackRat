// services/tripService.ts

import { Trip } from '../../drizzle/methods/trip';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getPublicTripsService = async (
  queryBy: string,
): Promise<object[]> => {
  try {
    const tripClass = new Trip()
    const publicTrips = await tripClass.findMany({
      columns: {
        id: true,
        name: true,
        description: true,
        duration: true,
        weather: true,
        start_date: true,
        end_date: true,
        destination: true,
        owner_id: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        ownerDocument: {
          columns: {
            id: true,
            username: true,
          }
        },
        packs: true,
      },
      where: (trips, { eq }) => eq(trips.is_public, true),
    });

    const allPacks = await tripClass.findMany({
      where: { id: { in: publicTrips.map((trip) => trip.packs) } },
    });

    const trips = publicTrips.map((trip) => {
      const ownerDocument = Array.isArray(trip.ownerDocument)
        ? trip.ownerDocument[0]
        : trip.ownerDocument;
      const packDocument = allPacks.find((pack) => pack.id === trip.packs);
      return {
        ...trip,
        packDocuments: packDocument,
        ownerDocument: ownerDocument,
      };
    });

    return trips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
