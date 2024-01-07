import { Pack } from '../../drizzle/methods/Pack';
import { Trip } from '../../drizzle/methods/trip';

/**
 * Retrieves trips belonging to a specific owner.
 *  @param {PrismaClient} prisma - Prisma client.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object[]>} The trips owned by the specified owner.
 */
export const getTripsService = async (ownerId: string): Promise<object[]> => {
  try {
    const tripClass = new Trip();
    const trips = await tripClass.findMany({
      where: { owner_id: ownerId },
    });

    const packClass = new Pack();

    const packDocumnets = await packClass.findMany({
      where: { id: { in: trips.map((trip) => trip.packs) } },
    });

    return trips.map((trip) => {
      const packDocuments = packDocumnets.find(
        (pack) => pack.id === trip.packs,
      );
      return {
        ...trip,
        packDocuments,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
