import { queryTrpc } from '../../trpc';

export const useEditTrips = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.editTrip.useMutation();

  const editTrips = (
    updatedTrip,
    options?: { onSuccess?: (queryUtils: typeof utils) => void },
  ) => {
    mutation.mutate(updatedTrip, {
      onSuccess: () => {
        utils.getTrips.invalidate();
        utils.getTripById.invalidate({ tripId: updatedTrip.id });
        options?.onSuccess?.(utils);
      },
    });
  };

  return {
    editTrips,
    ...mutation,
  };
};
