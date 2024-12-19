import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { setTripVisibilityService } from '../../services/trip/trip.service';

export function setTripVisibilityRoute() {
  return protectedProcedure
    .input(validator.setTripVisibility)
    .mutation(async (opts) => {
      const trip = await setTripVisibilityService(opts.input);
      return trip;
    });
}
