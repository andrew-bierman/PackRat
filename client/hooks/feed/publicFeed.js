import { queryTrpc } from '../../trpc';
import { RECORDS_PER_PAGE } from '~/constants/constants';

export const usePublicFeed = (queryString, selectedTypes, pageNo) => {
  let data = [];
  let isLoading = true;
  let totalPages = 0;
  try {
    const queryOptions = {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 1000 * 60, // 1 min
      cacheTime: 1000 * 60 * 5, // 5 min
    };

    const publicPacks = queryTrpc.getPublicPacks.useQuery(
      {
        queryBy: queryString ?? 'Favorite',
        pageNo,
        recordsPerPage: RECORDS_PER_PAGE,
      },
      {
        ...queryOptions,
        onSuccess: (data) =>
          console.log('Successfully fetched public packs!', data),
        onError: (error) =>
          console.error('Error fetching public packs:', error),
      },
    );

    const publicTrips = queryTrpc.getPublicTripsRoute.useQuery(
      {
        queryBy: queryString ?? 'Favorite',
        pageNo,
        recordsPerPage: RECORDS_PER_PAGE,
      },
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
        ...publicPacks.data.publicPacks.map((item) => ({
          ...item,
          type: 'pack',
        })),
      ];

    if (selectedTypes.trip && publicTrips?.status === 'success')
      data = [
        ...data,
        ...publicTrips.data.publicTrips.map((item) => ({
          ...item,
          type: 'trip',
        })),
      ];

    if (
      selectedTypes.trip &&
      publicTrips?.status === 'success' &&
      (!selectedTypes.pack || publicPacks.data.publicPacks.length === 0)
    ) {
      totalPages = Math.ceil(publicTrips?.data.totalRecords / RECORDS_PER_PAGE);
    } else if (
      selectedTypes.pack &&
      publicPacks?.status === 'success' &&
      (!selectedTypes.trip || publicTrips.data.publicTrips.length === 0)
    ) {
      totalPages = Math.ceil(publicPacks?.data.totalRecords / RECORDS_PER_PAGE);
    } else if (
      selectedTypes.pack &&
      publicPacks?.status === 'success' &&
      selectedTypes.trip &&
      publicTrips?.status === 'success'
    ) {
      const maxRecords = Math.max(
        publicTrips?.data.totalRecords,
        publicPacks?.data.totalRecords,
      );
      totalPages = Math.ceil(maxRecords / RECORDS_PER_PAGE);
    }
  } catch (error) {
    console.error(error);
    return { data: null, error, isLoading, totalPages };
  }

  return { data, error: null, isLoading, totalPages };
};
