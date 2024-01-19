import { Pack } from '../../drizzle/methods/pack';

export const getPackByIdService = async (packId: string) => {
  try {
    const packClass = new Pack();
    const pack = await packClass.findPack({ id: packId });

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
    return pack
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    throw error;
  }
};
