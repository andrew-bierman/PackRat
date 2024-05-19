import { InformUser } from 'app/utils/ToastUtils';
import { queryTrpc } from '../../trpc';

export const useCompleteTrip = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.completeTrip.useMutation();

  const completeTrip = (tripId: string) => {
    mutation.mutate({tripId}, {
      onSuccess: (result) => {
        utils.getTrips.invalidate();

        InformUser({
          title: 'Trip completed! Share your experience with others',
          placement: 'bottom',
          duration: 3000,
          style: { backgroundColor: 'green' },
        });
      },
    });
  };

  return completeTrip;
};
