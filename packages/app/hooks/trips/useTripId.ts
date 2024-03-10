import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ tripId: string }>();

export const useTripId = () => {
  return useParam('tripId');
};
