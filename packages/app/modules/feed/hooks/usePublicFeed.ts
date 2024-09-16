import { queryTrpc } from 'app/trpc';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

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
}[];

type OptionalDataType = DataType[];

export const usePublicFeed = (
  queryString: string,
  selectedTypes,
  searchQuery: string,
  initialPage = 1,
  initialLimit = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<OptionalDataType>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // Fetch public packs using the useQuery hook
  const {
    data: publicPacksData,
    isLoading: isPacksLoading,
    refetch: refetchPacks,
  } = queryTrpc.getPublicPacks.useQuery(
    { queryBy: queryString, searchQuery, page, limit: initialLimit },
    { keepPreviousData: true, enabled: selectedTypes.pack }
  );

  // Fetch public trips using the useQuery hook
  const {
    data: publicTripsData,
    isLoading: isTripsLoading,
    refetch: refetchTrips,
  } = queryTrpc.getPublicTripsRoute.useQuery(
    { queryBy: queryString },
    { enabled: selectedTypes.trip }
  );

  // Process fetched data
  const processedData = useMemo(() => {
    let newData: OptionalDataType = [];

    if (selectedTypes.pack && publicPacksData) {
      newData = [...newData, ...publicPacksData.map((item) => ({ ...item, type: 'pack' }))];
    }

    if (selectedTypes.trip && publicTripsData) {
      newData = [...newData, ...publicTripsData.map((item) => ({ ...item, type: 'trip' }))];
    }

    return newData;
  }, [publicPacksData, publicTripsData, selectedTypes]);

  // Use effect to update data and loading states
  useEffect(() => {
    const processFetchedData = () => {
      // if (!isPacksLoading && !isTripsLoading && processedData.length > 0) {
      if (!isPacksLoading && processedData.length > 0) {
        // Only update if data is different to avoid unnecessary re-renders
        setData((prevData) => {
          const newData = page === initialPage ? processedData : [...prevData, ...processedData];
          return JSON.stringify(newData) !== JSON.stringify(prevData) ? newData : prevData;
        });

        // Check if there is more data to fetch
        const hasMorePacks = publicPacksData && publicPacksData.length === initialLimit;
        const hasMoreTrips = publicTripsData && publicTripsData.length === initialLimit;
        setHasMore(hasMorePacks || hasMoreTrips);
      }

      setIsFetchingNextPage(false);
      setIsLoading(false);
    };

    processFetchedData();
  }, [
    publicPacksData,
    publicTripsData,
    isPacksLoading,
    isTripsLoading,
    page,
    processedData,
    initialPage,
    initialLimit,
  ]);

  // Debounced fetchNextPage to prevent rapid triggers
  const fetchNextPage = useCallback(
    debounce(async () => {
      if (hasMore && !isFetchingNextPage && !isLoading) {
        setIsFetchingNextPage(true);
        setPage((prevPage) => prevPage + 1);

        await refetchPacks();
        if (selectedTypes.trip) {
          await refetchTrips();
        }
      }
    }, 300), // Debounce with a delay of 300ms
    [hasMore, isFetchingNextPage, isLoading, refetchPacks, refetchTrips, selectedTypes]
  );

  return { data, isLoading, hasMore, fetchNextPage, refetch: refetchPacks, isFetchingNextPage };
};