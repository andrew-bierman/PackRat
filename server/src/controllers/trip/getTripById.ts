import { publicProcedure, protectedProcedure } from '../../trpc';
import { getTripByIdService } from '../../services/trip/getTripByIdService';
import * as validator from '@packrat/validations';
/**
 * Retrieves a trip by its ID and returns the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the trip details.
 */
// export const getTripById = async (req, res, next) => {
//   try {
//     const { tripId } = req.params;

//     const tripDetails = await getTripByIdService(tripId);

//     res.locals.data = tripDetails;
//     responseHandler(res);
//   } catch (error) {
//     next(TripNotFoundError);
//   }
// };

export function getTripByIdRoute() {
  return protectedProcedure.input(validator.getTripById).query(async (opts) => {
    const { tripId } = opts.input;
    return await getTripByIdService(tripId);
  });
}
