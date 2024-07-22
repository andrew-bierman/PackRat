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
        options?.onSuccess?.(utils);
      },
    });
  };

  return {
    editTrips,
    ...mutation,
  };
};
