import { publicProcedure, protectedProcedure } from '../../trpc';
import { UnableToEditTripError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

// import { prisma } from '../../prisma';
import * as validator from '@packrat/validations';
import { Trip } from '../../drizzle/methods/trip';

/**
 * Edits a trip by updating the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated trip object.
 */
// export const editTrip = async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     const newTrip = await prisma.trip.update({
//       where: { id: id }, // Assuming id is the ID of the trip to update
//       data: req.body,
//       include: {
//         packs: true, // Fetch associated packs
//       },
//     });

//     res.locals.data = newTrip;
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToEditTripError);
//   }
// };

export function editTripRoute() {
  return protectedProcedure.input(validator.editTrip).mutation(async (opts) => {
    const tripData = { ...opts.input };
    const tripClass = new Trip();
    const trip = await tripClass.update(tripData);
    return trip;
  });
}
