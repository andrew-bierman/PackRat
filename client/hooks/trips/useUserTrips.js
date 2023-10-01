import { queryTrpc } from '../../trpc';

export const useUserTrips = (ownerId) => {
  let data = [];
  let isLoading = true;

  if (!ownerId) return { data, error: null, isLoading: false };

  try {
    const userTrips = queryTrpc.getTrips.useQuery(
      { owner_id: ownerId },
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

    isLoading = userTrips?.status !== 'success';

    if (userTrips?.status === 'success') data = userTrips.data;
  } catch (error) {
    console.error(error);
    return { data: null, error, isLoading };
  }

  return { data, error: null, isLoading };
};
