import { useRouter } from 'app/hooks/router';
import { queryTrpc } from 'app/trpc';

export const useDeleteTrips = (id) => {
  const { mutateAsync: deleteTrip } = queryTrpc.deleteTrip.useMutation();
  const router = useRouter();

  const handleDeleteTrip = async () => {
    try {
      await deleteTrip({ tripId: id });
      router.replace('/trips');
    } catch {}
  };

  return { handleDeleteTrip };
};
