import { PrismaClient } from '@prisma/client/edge';

/**
 * Retrieves trips belonging to a specific owner.
 *  @param {PrismaClient} prisma - Prisma client.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object[]>} The trips owned by the specified owner.
 */
export const getTripsService = async (
  prisma: PrismaClient,
  ownerId: string,
): Promise<object[]> => {
  try {
    const trips = await prisma.trip.findMany({
      where: { owner_id: ownerId },
      include: {
        packs: true,
      },
    });

    return trips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
