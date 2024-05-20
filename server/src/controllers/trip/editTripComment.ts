import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { Trip } from '../../drizzle/methods/trip';

export function editTripRoute() {
  return publicProcedure
    .input(validator.editTripComment)
    .mutation(async (opts) => {
      const { tripId, comment } = { ...opts.input };
      const tripClass = new Trip();
      const trip = await tripClass.update({ id: tripId, comment });
      return trip;
    });
}
