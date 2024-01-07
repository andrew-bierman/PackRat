import { eq } from 'drizzle-orm';
import { Pack } from '../../drizzle/methods/pack';
import { pack as packSchema } from '../../db/schema';

export const getPackByIdService = async (packId) => {
  try {
    const packClass = new Pack();
    const pack = await packClass.findUniquePack({
      where: eq(packSchema.id, packId),
    });

    // update this code when trip related code is updated
    // const trips = await trip.findMany({
    //   where: {
    //     id: {
    //       in: pack?.trips.map((tripId) => tripId) ?? [],
    //     },
    //   },
    // });

    // Parse JSON
    // const ownerDocument = pack.ownerDocument;
    // const favoritedByDocuments = pack.favoritedByDocuments
    // const ownerDocuments = pack.ownerDocuments
    // const tripDocuments = trips
    return {
      ...pack,
      // ownerDocument,
      // ownerDocuments,
      // favoritedByDocuments,
      // tripDocuments,
    };
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    throw error;
  }
};
