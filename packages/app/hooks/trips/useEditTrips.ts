import { queryTrpc } from '../../trpc';

export const useEditTrips = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.editTrip.useMutation();

  const editTrips = (updatedTrip) => {
    mutation.mutate(updatedTrip, {
      onSuccess: () => {
        utils.getTrips.invalidate();
      },
    });
  };

  return {
    editTrips,
    ...mutation,
  };
};
