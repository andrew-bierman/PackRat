import { Trip } from "../../drizzle/methods/Trip";
import { Pack} from "../../drizzle/methods/Pack";

export const getTripsService = async (ownerId: string) =>{
  const tripClass = new Trip();
  const packClass = new Pack();
  try{
    const trips = await tripClass.findMany({where: {owner_id: ownerId}});
    const allPacks = await packClass.findMany({where: {id: {in: trips.map((trip) => trip.packs)}}});
    return trips.map((trip) => {
      const packDocument = allPacks.find((pack) => pack.id === trip.packs);
      return {
        ...trip,
        packDocuments: Pack(packDocument)?.toJSON(),
      };
    });
  }
  catch(error){
    console.error(error);
    throw new Error('Trips cannot be found');
  }
}

// import { PrismaClient } from '@prisma/client/edge';
// import { Pack } from '../../prisma/methods';

// /**
//  * Retrieves trips belonging to a specific owner.
//  *  @param {PrismaClient} prisma - Prisma client.
//  * @param {string} ownerId - The ID of the owner.
//  * @return {Promise<object[]>} The trips owned by the specified owner.
//  */
// export const getTripsService = async (
//   prisma: PrismaClient,
//   ownerId: string,
// ): Promise<object[]> => {
//   try {
//     const trips = await prisma.trip.findMany({
//       where: { owner_id: ownerId },
//     });

//     const packDocumnets = await prisma.pack.findMany({
//       where: { id: { in: trips.map((trip) => trip.packs) } },
//     });

//     return trips.map((trip) => {
//       const packDocuments = packDocumnets.find(
//         (pack) => pack.id === trip.packs,
//       );
//       return {
//         ...trip,
//         packDocuments: Pack(packDocuments)?.toJSON(),
//       };
//     });
//   } catch (error) {
//     console.error(error);
//     throw new Error('Trips cannot be found');
//   }
// };
