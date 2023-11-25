import { PrismaClient } from '@prisma/client/edge';

/**
 * Retrieves a trip by its ID and returns the trip details.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} tripId - The ID of the trip.
 * @return {Promise<object>} A promise that resolves to the trip details.
 */
export const getTripByIdService = async (
  prisma: PrismaClient,
  tripId: string,
): Promise<object> => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { owner: true, geojson: true }, // Assuming 'owner_id' is a foreign key to the 'User' model
    });

    if (!trip) {
      throw new Error('Trip cannot be found');
    }

    // Convert the Prisma response to a plain JavaScript object
    const tripObject = {
      id: trip.id,
      name: trip.name, // Replace with the actual fields you have
      // Add more fields as needed
      geojson: {
        type: 'FeatureCollection',
        features: trip.geojson,
      },
      owner: trip.owner, // This will have the owner details if included
    };

    return tripObject;
  } catch (error) {
    console.error(error);
    throw new Error('Trip cannot be found');
  }
};
