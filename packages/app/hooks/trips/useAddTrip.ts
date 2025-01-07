import { queryTrpc } from '../../trpc';

export const useAddTrip = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.addTrip.useMutation();

  const addTrip = (newTrip) => {
    mutation.mutate(newTrip, {
      onSuccess: (result) => {
        utils.getTrips.invalidate();
        utils.getUserTripsFeed.invalidate();
      },
    });
  };

  return {
    addTrip,
    response: mutation.data,
    ...mutation,
  };
};
