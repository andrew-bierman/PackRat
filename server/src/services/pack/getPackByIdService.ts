import { PrismaClient } from '@prisma/client/edge';
import { Trip, User } from '../../prisma/methods';

export const getPackByIdService = async (prisma: PrismaClient, packId) => {
  try {
    const pack = await prisma.pack.findFirst({
      where: { id: packId },
      include: {
        favoritedByDocuments: true,
        itemDocuments: true,
        ownerDocument: true,
        ownerDocuments: true,
      },
    });

    const trips = await prisma.trip.findMany({
      where: {
        id: {
          in: pack?.trips.map((tripId) => tripId) ?? [],
        },
      },
    });

    // Parse JSON
    const ownerDocument = User(pack.ownerDocument)?.toJSON();
    const favoritedByDocuments = pack.favoritedByDocuments.map(
      (user) => User(user)?.toJSON(),
    );
    const ownerDocuments = pack.ownerDocuments.map(
      (user) => User(user)?.toJSON(),
    );
    const tripDocuments = trips.map((trip) => Trip(trip)?.toJSON(prisma));
    return {
      ...pack,
      ownerDocument,
      ownerDocuments,
      favoritedByDocuments,
      tripDocuments,
    };
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    throw error;
  }
};
