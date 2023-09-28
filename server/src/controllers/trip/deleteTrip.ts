import { publicProcedure } from '../../trpc';
import { UnableToDeleteTripError } from '../../helpers/errors';
import Trip from '../../models/tripModel';
import * as validator from '../../middleware/validators/index';
import { TRPCError } from '@trpc/server';
/**
 * Deletes a trip from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a JSON object containing a success message if the trip was deleted successfully, or an error message if the trip could not be deleted.
 */
export const deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.body;

    await Trip.findOneAndDelete({ _id: tripId });
    res.status(200).json({ msg: 'trip was deleted successfully' });
  } catch (error) {
    next(UnableToDeleteTripError);
  }
};

export function deleteTripRoute() {
  return publicProcedure.input(validator.deleteTrip).mutation(async (opts) => {
    try {
      const { tripId } = opts.input;
      await Trip.findOneAndDelete({ _id: tripId });
      return "trip was deleted successfully";
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
  })
}