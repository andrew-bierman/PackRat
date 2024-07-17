import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { Trip } from '../../drizzle/methods/trip';

/**
 * Edits a trip by updating the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated trip object.
 */
export const editTrip = async (c) => {
  try {
    const tripData = await c.req.parseBody();
    const tripClass = new Trip();
    const trip = await tripClass.update(tripData);
    return c.json({ trip }, 200);
  } catch (error) {
    return c.json({ error: `Failed to edit trip: ${error.message}` }, 500);
  }
};

export function editTripRoute() {
  return protectedProcedure.input(validator.editTrip).mutation(async (opts) => {
    const tripData = { ...opts.input };
    const tripClass = new Trip();
    const trip = await tripClass.update(tripData);
    return trip;
  });
}
