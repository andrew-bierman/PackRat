import { publicProcedure } from '../../trpc';
import { addTripService } from '../../services/trip/addTripService';
import * as validator from '@packrat/validations';
/**
 * Adds a trip to the database.
 * @param {Object} req - The request object containing the trip details.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a success message or rejects with an error message.
 */
// export const addTrip = async (req, res, next) => {
//   try {
//     const {
//       name,
//       description,
//       duration,
//       weather,
//       start_date,
//       end_date,
//       destination,
//       geoJSON,
//       owner_id,
//       packs,
//       is_public,
//     } = req.body;

//     const tripDetails = {
//       name,
//       description,
//       duration,
//       weather,
//       start_date,
//       end_date,
//       destination,
//       geoJSON,
//       owner_id,
//       packs,
//       is_public,
//     };

//     const result = await addTripService(tripDetails);

//     res.locals.data = result;
//     responseHandler(res);
//   } catch (error) {
//     next(UnableToAddTripError);
//   }
// };

export function addTripRoute() {
  return publicProcedure.input(validator.addTrip).mutation(async (opts) => {
    const tripData = opts.input;
    return await addTripService(tripData);
  });
}
