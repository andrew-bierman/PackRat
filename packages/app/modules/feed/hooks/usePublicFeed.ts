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
  initialLimit = 2
) => {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<OptionalDataType>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // Fetch packs using the useQuery hook
  const {
    data: publicPacksData,
    isLoading: isPacksLoading,
    refetch: refetchPacks,
  } = queryTrpc.getPublicPacks.useQuery(
    { queryBy: queryString ?? 'Favorite', page, limit: initialLimit },
    { keepPreviousData: true, enabled: selectedTypes.pack }
  );

  // Fetch trips only if the public packs have been successfully loaded
  const {
    data: publicTripsData,
    isLoading: isTripsLoading,
    refetch: refetchTrips,
  } = queryTrpc.getPublicTripsRoute.useQuery(
    { queryBy: queryString ?? 'Favorite' },
    { enabled: selectedTypes.trip && publicPacksData?.length > 0 }
  );

  useEffect(() => {
    if (!isPacksLoading && !isTripsLoading && (publicPacksData || publicTripsData)) {
      let newData: OptionalDataType = [];

      if (selectedTypes.pack && publicPacksData) {
        newData = [...newData, ...publicPacksData.map((item) => ({ ...item, type: 'pack' }))];
      }

      if (selectedTypes.trip && publicTripsData) {
        newData = [...newData, ...publicTripsData.map((item) => ({ ...item, type: 'trip' }))] as any;
      }

      if (newData.length > 0) {
        // Only update if it's the first fetch or new data is fetched
        setData((prevData) => (isFetchingNextPage ? [...prevData, ...newData] : newData));

        if (newData.length < initialLimit) {
          setHasMore(false); // No more data to fetch
        }
      } else {
        setHasMore(false); // No more data available
      }

      setIsFetchingNextPage(false);
      setIsLoading(false);
    }
  }, [publicPacksData, publicTripsData, selectedTypes]);

  const fetchNextPage = async () => {
    if (hasMore && !isLoading && !isFetchingNextPage) {
      setIsFetchingNextPage(true);
      setIsLoading(true);
      refetchPacks();
      refetchTrips();
      setPage((prevPage) => prevPage + 1); // Increment page here
    }
  };

  return { data, isLoading, hasMore, fetchNextPage };
};
