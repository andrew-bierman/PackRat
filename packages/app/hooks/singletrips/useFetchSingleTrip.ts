import { queryTrpc } from '../../trpc';
import { useAuthUser } from 'app/auth/hooks';
export const useFetchSingleTrip = (tripId) => {
  const user = useAuthUser();
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getTripById.useQuery(
      { tripId },
      {
        enabled: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );
  const isOwner = data && user && data.owner_id === user.id;
  return { refetch, data, error, isLoading, isOwner, isError };
};

// export const useCreatePack = () => {
//     const mutation = queryTrpc.addPack.useMutation();
// }
