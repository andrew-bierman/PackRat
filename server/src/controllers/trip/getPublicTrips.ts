import { publicProcedure } from '../../trpc';
import { TripNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicTripsService } from '../../services/trip/getPublicTripService';
import * as validator from '../../middleware/validators';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
export const getPublicTrips = async (req, res, next) => {
  try {
    const { queryBy } = req.query;

    const publicTrips = await getPublicTripsService(queryBy);

    res.locals.data = publicTrips;
    responseHandler(res);
  } catch (error) {
    next(TripNotFoundError);
  }
};

export function getPublicTripsRoute() {
  return publicProcedure.input(z.object({ queryBy: z.string() })).query(async (opts) => {
    try {
      const { queryBy } = opts.input;
      return await getPublicTripsService(queryBy);
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
  });
}