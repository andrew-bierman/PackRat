import { publicProcedure, protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { Trip } from '../../drizzle/methods/trip';

export const deleteTrip = async (c) => {
  try {
    const { tripId } = await c.req.json();
    const tripClass = new Trip();
    await tripClass.delete(tripId);
    return c.json({ message: 'trip was deleted successfully' }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function deleteTripRoute() {
  return protectedProcedure
    .input(validator.deleteTrip)
    .mutation(async (opts) => {
      const { tripId } = opts.input;
      const tripClass = new Trip();
      await tripClass.delete(tripId);
      return 'trip was deleted successfully';
    });
}
