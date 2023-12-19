import { queryTrpc } from '../../trpc';

export const useAddTrip = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.addTrip.useMutation();

  const addTrip = (newTrip) => {
    mutation.mutate(newTrip, {
      onSuccess: () => {
        utils.getTrips.invalidate();
      },
    });
  };

  return {
    addTrip,
    ...mutation,
  };
};
