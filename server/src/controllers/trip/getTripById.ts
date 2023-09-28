import { publicProcedure } from '../../trpc';
import { TripNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getTripByIdService } from '../../services/trip/getTripByIdService';
import * as validator from '../../middleware/validators/index';
import { TRPCError } from '@trpc/server';
/**
 * Retrieves a trip by its ID and returns the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the trip details.
 */
export const getTripById = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const tripDetails = await getTripByIdService(tripId);

    res.locals.data = tripDetails;
    responseHandler(res);
  } catch (error) {
    next(TripNotFoundError);
  }
};

export function getTripByIdRoute() {
  return publicProcedure.input(validator.getTripById).query(async (opts) => {
    try {
      const { tripId } = opts.input;
      return await getTripByIdService(tripId);
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
  })
}