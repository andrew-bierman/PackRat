import { publicProcedure } from '../../trpc';
import { UnableToEditTripError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Trip from '../../models/tripModel';
import * as validator from '../../middleware/validators/index';
/**
 * Edits a trip by updating the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated trip object.
 */
export const editTrip = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const newTrip = await Trip.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    }).populate('packs');

    res.locals.data = newTrip;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditTripError);
  }
};

export function editTripRoute() {
  return publicProcedure.input(validator.editTrip).mutation(async (opts) => {
    const { _id } = opts.input;
    return await Trip.findOneAndUpdate({ _id }, opts.input, {
      returnOriginal: false,
    }).populate('packs');
  })
}