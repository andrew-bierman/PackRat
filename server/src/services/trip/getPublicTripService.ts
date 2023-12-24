
import { Trip } from '../../drizzle/methods/Trip';
import { Pack } from '../../drizzle/methods/Pack';
import { User } from '../../drizzle/methods/User';
import { eq } from 'drizzle-orm';

export const getPublicTripsService = async (queryBy: string): Promise<object[]> => {
  try {
    const tripClass = new Trip();
    const packClass = new Pack();
    const userClass = new User();

    const publicTrips = await tripClass.findMany({
      where: { is_public: true },
      orderBy: queryBy === 'Favorite' ? { id: 'desc' } : { id: 'asc' },
    });
    
    const allPacks = await packClass.findMany({
      where: { id: { in: publicTrips.map((trip) => trip.packs) } },
    });

    const allUsers = await userClass.findMany({
      where: { id: { in: publicTrips.map((trip) => trip.ownerDocument) } },
    });

    const trips = publicTrips.map((trip) => {
      const ownerDocument = allUsers.find((user) => user.id === trip.ownerDocument);
      const packDocument = allPacks.find((pack) => pack.id === trip.packs);
      return {
        ...trip,
        packDocuments: Pack(packDocument)?.toJSON(),
        ownerDocument: User(ownerDocument)?.toJSON(),
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
// // services/tripService.ts

// import { PrismaClient } from '@prisma/client/edge';
// import { Pack, User } from '../../prisma/methods';

// /**
//  * Retrieves public trips based on the given query parameter.
//  * @param {PrismaClient} prisma - Prisma client.
//  * @param {string} queryBy - The query parameter to sort the trips.
//  * @return {Promise<object[]>} The public trips.
//  */
// export const getPublicTripsService = async (
//   prisma: PrismaClient,
//   queryBy: string,
// ): Promise<object[]> => {
//   try {
//     const publicTrips = await prisma.trip.findMany({
//       where: { is_public: true },
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         duration: true,
//         weather: true,
//         start_date: true,
//         end_date: true,
//         destination: true,
//         owner_id: true,
//         ownerDocument: {
//           select: {
//             id: true,
//             username: true,
//           },
//         },
//         packs: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//       orderBy: queryBy === 'Favorite' ? { id: 'desc' } : { id: 'asc' },
//     });

//     const allPacks = await prisma.pack.findMany({
//       where: { id: { in: publicTrips.map((trip) => trip.packs) } },
//     });

//     const trips = publicTrips.map((trip) => {
//       const ownerDocument = Array.isArray(trip.ownerDocument)
//         ? trip.ownerDocument[0]
//         : trip.ownerDocument;
//       const packDocument = allPacks.find((pack) => pack.id === trip.packs);
//       return {
//         ...trip,
//         packDocuments: Pack(packDocument)?.toJSON(),
//         ownerDocument: User(ownerDocument)?.toJSON(),
//       };
//     });

//     return trips;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Trips cannot be found');
//   }
// };
