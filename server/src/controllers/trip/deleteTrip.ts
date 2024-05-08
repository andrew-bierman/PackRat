import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { Trip } from '../../drizzle/methods/trip';

// import { prisma } from '../../prisma';
/**
 * Deletes a trip from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a JSON object containing a success message if the trip was deleted successfully, or an error message if the trip could not be deleted.
 */
// export const deleteTrip = async (req, res, next) => {
//   try {
//     const { tripId } = req.body;

//     await prisma.trip.delete({
//       where: { id: tripId }, // Assuming tripId is the ID of the trip to delete
//     });
//     res.status(200).json({ msg: 'trip was deleted successfully' });
//   } catch (error) {
//     next(UnableToDeleteTripError);
//   }
// };

export function deleteTripRoute() {
  return publicProcedure.input(validator.deleteTrip).mutation(async (opts) => {
    const { tripId } = opts.input;
    const tripClass = new Trip();
    await tripClass.delete(tripId);
    return 'trip was deleted successfully';
  });
}
