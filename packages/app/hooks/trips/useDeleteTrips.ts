import { useRouter } from 'app/hooks/router';
import { queryTrpc } from 'app/trpc';

export const useDeleteTrips = (id) => {
  const { mutateAsync: deleteTrip } = queryTrpc.deleteTrip.useMutation();
  const utils = queryTrpc.useUtils();
  const router = useRouter();

  const handleDeleteTrip = async () => {
    try {
      await deleteTrip({ tripId: id });
      utils.getTrips.invalidate();
      utils.getUserTripsFeed.invalidate();
      router.replace('/trips');
    } catch {}
  };

  return { handleDeleteTrip };
};
