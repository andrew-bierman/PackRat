import { queryTrpc } from 'app/trpc';
import { useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // Fetch public packs using the useQuery hook
  const {
    data: publicPacksData,
    isLoading: isPacksLoading,
    refetch: refetchPacks,
  } = queryTrpc.getPublicPacks.useQuery(
    { queryBy: queryString ?? 'Favorite', page, limit: initialLimit },
    { keepPreviousData: true, enabled: selectedTypes.pack }
  );

  // Fetch public trips using the useQuery hook
  const {
    data: publicTripsData,
    isLoading: isTripsLoading,
    refetch: refetchTrips,
  } = queryTrpc.getPublicTripsRoute.useQuery(
    { queryBy: queryString ?? 'Favorite' },
    { enabled: selectedTypes.trip && publicPacksData?.length > 0 }
  );

  // Ensure that fetching logic behaves consistently
  useEffect(() => {
    const processFetchedData = () => {
      if (!isPacksLoading && !isTripsLoading && (publicPacksData || publicTripsData)) {
        let newData: OptionalDataType = [];

        // Fetch and append packs
        if (selectedTypes.pack && publicPacksData) {
          newData = [...newData, ...publicPacksData.map((item) => ({ ...item, type: 'pack' }))];
        }

        // Fetch and append trips
        if (selectedTypes.trip && publicTripsData) {
          newData = [...newData, ...publicTripsData.map((item) => ({ ...item, type: 'trip' }))];
        }

        // Update data in state
        setData((prevData) => {
          return page === initialPage ? newData : [...prevData, ...newData];  // Append for subsequent pages
        });

        // Set `hasMore` based on the data fetched
        setHasMore(newData.length === initialLimit);

        // Reset loading states
        setIsLoading(false);
        setIsFetchingNextPage(false);
      }
    };

    processFetchedData();
  }, [publicPacksData, publicTripsData, page, selectedTypes]);

  // Fetch the next page of data
  const fetchNextPage = async () => {
    if (hasMore && !isLoading && !isFetchingNextPage) {
      setIsFetchingNextPage(true);
      setPage((prevPage) => prevPage + 1);  // Increment the page before fetching new data

      // Fetch packs and trips for the next page
      await refetchPacks();
      if (selectedTypes.trip) {
        await refetchTrips();
      }

      setIsFetchingNextPage(false);  // Reset fetching state after data fetch
    }
  };

  return { data, isLoading, hasMore, fetchNextPage, refetch: refetchPacks };
};
