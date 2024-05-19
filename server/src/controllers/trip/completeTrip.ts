import { publicProcedure } from '../../trpc';
import { completeTripService } from '../../services/trip/completeTripService';
import * as validator from '@packrat/validations';

export function completeTripRoute() {
  return publicProcedure
    .input(validator.completeTrip)
    .mutation(async (opts) => {
      const { tripId } = opts.input;
      return await completeTripService(tripId);
    });
}
