import { publicProcedure } from '../../trpc';
import { TripNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

import { getTripsService } from '../../services/trip/getTripsService';
import * as validator from '../../middleware/validators/index';
import { Trip } from '../../prisma/methods';
/**
 * Retrieves trips belonging to a specific owner.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The trips owned by the specified owner.
 */
// export const getTrips = async (req, res, next) => {
//   try {
//     const { ownerId } = req.params;

//     const trips = await getTripsService(ownerId);

//     res.locals.data = trips;
//     responseHandler(res);
//   } catch (error) {
//     next(TripNotFoundError);
//   }
// };

export function getTripsRoute() {
  return publicProcedure.input(validator.getTrips).query(async (opts) => {
    const { owner_id } = opts.input;
    const { prisma }: any = opts.ctx;
    const trips = await getTripsService(prisma, owner_id);
    const jsonTrips = Promise.all(
      trips.map((trip) => Trip(trip as any).toJSON(prisma)),
    );
  });
}
