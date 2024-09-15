import { queryTrpc } from 'app/trpc';
import { useState, useEffect, useCallback } from 'react';

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
  initialPage = 1,
  initialLimit = 4
) => {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<OptionalDataType>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false); // Lock next fetches

  // Fetch public packs using the useQuery hook
  const {
    data: publicPacksData,
    isLoading: isPacksLoading,
    refetch: refetchPacks,
  } = queryTrpc.getPublicPacks.useQuery(
    { queryBy: queryString, page, limit: initialLimit },
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

  // Process fetched data when packs/trips are loaded
  useEffect(() => {
    const processFetchedData = () => {

      console.log('publicPacksData', page);
      // if (!isPacksLoading && !isTripsLoading && (publicPacksData || publicTripsData)) { //will update once trip is done
        if (!isPacksLoading  && (publicPacksData || publicTripsData)) {
        let newData: OptionalDataType = [];

        // Add packs to the data
        if (selectedTypes.pack && publicPacksData) {
          newData = [...newData, ...publicPacksData.map((item) => ({ ...item, type: 'pack' }))];
        }

        // Add trips to the data
        if (selectedTypes.trip && publicTripsData) {
          newData = [...newData, ...publicTripsData.map((item) => ({ ...item, type: 'trip' }))];
        }

        // Append or reset data based on the current page
        setData((prevData) => (page === initialPage ? newData : [...prevData, ...newData]));

        // Check if there is more data to fetch (if the fetched data length is less than the limit, there's no more data)
        const hasMorePacks = publicPacksData && publicPacksData.length === initialLimit;
        const hasMoreTrips = publicTripsData && publicTripsData.length === initialLimit;

        setHasMore(hasMorePacks || hasMoreTrips); // Properly set `hasMore`

        // Mark the next page fetch as complete only after the data is rendered
        setIsFetchingNextPage(false);
        setIsLoading(false);
      }
    };

    processFetchedData();
  }, [publicPacksData, publicTripsData, isPacksLoading, isTripsLoading, page, selectedTypes]);

  // Fetch next page of data
  const fetchNextPage = useCallback(async () => {
    if (hasMore && !isFetchingNextPage && !isLoading) {
      setIsFetchingNextPage(true); // Prevent additional fetches while fetching
      setPage((prevPage) => prevPage + 1); // Increment the page to load next data

      // Fetch packs for the next page
      await refetchPacks();
      if (selectedTypes.trip) {
        await refetchTrips();
      }
    }
  }, [hasMore, isFetchingNextPage, isLoading, refetchPacks, refetchTrips, selectedTypes]);

  return { data, isLoading, hasMore, fetchNextPage, refetch: refetchPacks, isFetchingNextPage };
};