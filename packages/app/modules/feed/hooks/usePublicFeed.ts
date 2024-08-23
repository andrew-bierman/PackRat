import { queryTrpc } from 'app/trpc';

type DataType = {
  type: string;
  id: string;
  duration: string;
  name: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
  pack_id: string | null;
  owner_id: string | null;
  is_public: boolean | null;
  //  ... rest
}[];

type OptionalDataType = {
  [K in keyof DataType]?: DataType[K];
}[];

export const usePublicFeed = (queryString, selectedTypes) => {
  let data: OptionalDataType = [];
  let isLoading = true;
  let refetch = () => {};
  try {
    const queryOptions = {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 1000 * 60, // 1 min
      cacheTime: 1000 * 60 * 5, // 5 min
    };
    const publicPacks = queryTrpc.getPublicPacks.useQuery(
      { queryBy: queryString ?? 'Favorite' },
      {
        ...queryOptions,
        onSuccess: (data) =>
          console.log('Successfully fetched public packs!', data),
        onError: (error) =>
          console.error('Error fetching public packs:', error),
      },
    );

    const publicTrips = queryTrpc.getPublicTripsRoute.useQuery(
      { queryBy: queryString ?? 'Favorite' },
      {
        ...queryOptions,
        enabled: publicPacks?.status === 'success',
      },
    );

    isLoading =
      publicPacks?.status !== 'success' && publicTrips?.status !== 'success';

    if (selectedTypes.pack && publicPacks?.status === 'success')
      data = [
        ...data,
        ...publicPacks.data.map((item) => ({ ...item, type: 'pack' })),
      ];

    if (selectedTypes.trip && publicTrips?.status === 'success')
      data = [
        ...data,
        ...publicTrips.data.map((item) => ({ ...item, type: 'trip' })),
      ];

    refetch = () => {
      publicPacks.refetch();
      publicTrips.refetch();
    };
  } catch (error) {
    console.error(error);
    return { data: null, error, isLoading, refetch };
  }

  return { data, error: null, isLoading, refetch };
};
