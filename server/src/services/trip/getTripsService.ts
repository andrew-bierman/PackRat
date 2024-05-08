import { Trip } from '../../drizzle/methods/trip';

/**
 * Retrieves trips belonging to a specific owner.
 *  @param {PrismaClient} prisma - Prisma client.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object[]>} The trips owned by the specified owner.
 */
export const getTripsService = async (ownerId: string) => {
  try {
    const tripClass = new Trip();
    const trips = await tripClass.findMany(ownerId);
    return trips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
