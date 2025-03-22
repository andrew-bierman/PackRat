import { queryTrpc } from '../../trpc';

export const useSetTripVisibility = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.setTripVisibility.useMutation();

  const setTripVisibility = (
    updatedTrip,
    options?: { onSuccess?: (queryUtils: typeof utils) => void },
  ) => {
    mutation.mutate(updatedTrip, {
      onSuccess: () => {
        utils.getTrips.invalidate();
        utils.getUserTripsFeed.invalidate();
        // utils.getSingleTrip.invalidate();
        utils.getUserTripsFeed.invalidate();
        options?.onSuccess?.(utils);
      },
    });
  };

  return {
    setTripVisibility,
    ...mutation,
  };
};
