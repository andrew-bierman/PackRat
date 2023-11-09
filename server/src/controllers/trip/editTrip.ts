import { publicProcedure } from '../../trpc';
import { UnableToEditTripError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

import { prisma } from '../../prisma';
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
    const newTrip = await prisma.trip.update({
      where: { id: _id }, // Assuming _id is the ID of the trip to update
      data: req.body,
      include: {
        packs: true, // Fetch associated packs
      },
    });

    res.locals.data = newTrip;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditTripError);
  }
};

export function editTripRoute() {
  return publicProcedure.input(validator.editTrip).mutation(async (opts) => {
    const { _id } = opts.input;

    return await prisma.trip.update({
      where: { id: _id }, // Assuming _id is the ID of the trip to update
      data: opts.input,
      include: {
        packs: true, // Fetch associated packs
      },
    });
  });
}
