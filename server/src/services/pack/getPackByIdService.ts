import { Trip, User } from '../../prisma/methods';
import { prisma } from '../../prisma';

export const getPackByIdService = async (packId) => {
  try {
    const pack = await prisma.pack.findFirst({
      where: { id: packId },
      include: {
        favorited_by: true,
        items: true,
        owner: true,
        owners: true,
        trips: true,
      },
    });

    // Parse JSON
    const owner = User(pack.owner)?.toJSON();
    const favorited_by = pack.favorited_by.map((user) => User(user)?.toJSON());
    const owners = pack.owners.map((user) => User(user)?.toJSON());
    const trips = pack.trips.map((trip) => Trip(trip)?.toJSON());
    return {
      ...pack,
      owner,
      owners,
      favorited_by,
      trips,
    };
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    throw error;
  }
};
