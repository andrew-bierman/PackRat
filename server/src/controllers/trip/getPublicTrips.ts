import { publicProcedure, protectedProcedure } from '../../trpc';
import { getPublicTripsService } from '../../services/trip/getPublicTripService';
import * as validator from '@packrat/validations';
import { z } from 'zod';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
// export const getPublicTrips = async (req, res, next) => {
//   try {
//     const { queryBy } = req.query;

//     const publicTrips = await getPublicTripsService(queryBy);

//     res.locals.data = publicTrips;
//     responseHandler(res);
//   } catch (error) {
//     next(TripNotFoundError);
//   }
// };

export function getPublicTripsRoute() {
  return protectedProcedure
    .input(z.object({ queryBy: z.string() }))
    .query(async (opts) => {
      const { queryBy } = opts.input;
      const trips = await getPublicTripsService(queryBy);
      return trips;
    });
}
