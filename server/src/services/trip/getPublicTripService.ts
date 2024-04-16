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
    const tripClass = new Trip();
    const publicTrips = await tripClass.findPublicTrips(queryBy);
    return publicTrips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
