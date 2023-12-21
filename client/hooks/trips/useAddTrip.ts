import { useRouter } from 'expo-router';
import { queryTrpc } from '../../trpc';

export const useAddTrip = () => {
  const router = useRouter();
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.addTrip.useMutation();

  const addTrip = (newTrip) => {
    mutation.mutate(newTrip, {
      onSuccess: () => {
        utils.getTrips.invalidate();
        router.push('/trips');
      },
    });

  };

  return {
    addTrip,
    ...mutation,
  };
};
