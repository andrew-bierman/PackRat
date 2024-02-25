import { queryTrpc } from '../../trpc';

export const usePublicFeed = (queryString, selectedTypes) => {
  let data = [];
  let isLoading = true;
  let refetch = () => {};
  try {
    const queryOptions = {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 1000 * 60, // 1 min
      cacheTime: 1000 * 60 * 5, // 5 min
    };

    const {
      status: statusPacks,
      data: packsData,
      refetch: refetchPacks,
    } = queryTrpc.getPublicPacks.useQuery(
      { queryBy: queryString ?? 'Favorite' },
      {
        ...queryOptions,
        onSuccess: (data) =>
          console.log('Successfully fetched public packs!', data),
        onError: (error) =>
          console.error('Error fetching public packs:', error),
      },
    );

    const {
      status: statusTrips,
      data: tripsData,
      refetch: refetchTrips,
    } = queryTrpc.getPublicTripsRoute.useQuery(
      { queryBy: queryString ?? 'Favorite' },
      {
        ...queryOptions,
        enabled: statusPacks === 'success',
      },
    );

    refetch = () => {
      refetchTrips();
      refetchPacks();
    };

    isLoading = statusPacks !== 'success' && statusTrips !== 'success';

    if (selectedTypes.pack && statusPacks === 'success')
      data = [...data, ...packsData.map((item) => ({ ...item, type: 'pack' }))];

    if (selectedTypes.trip && statusTrips === 'success')
      data = [...data, ...tripsData.map((item) => ({ ...item, type: 'trip' }))];
  } catch (error) {
    console.error(error);
    return { data: null, error, isLoading };
  }

  return { data, error: null, isLoading, refetch };
};
