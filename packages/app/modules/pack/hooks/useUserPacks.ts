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

export const useUserPacks = (
  ownerId: string | undefined,
  queryString = '',
  searchQuery: string | undefined,
  initialPage = 1,
  initialLimit = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<OptionalDataType>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const utils = queryTrpc.useContext();
  const enabled = !!ownerId;

  const {
    data: fetchedData,
    error,
    refetch,
  } = queryTrpc.getPacks.useQuery(
    { ownerId: ownerId || '', queryBy: queryString, searchQuery, page, limit: initialLimit },
    {
      enabled,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const processFetchedData = () => {
      if (fetchedData?.packs) {
        const newPacks = fetchedData.packs.map((item) => ({ ...item, type: 'pack' }));

        // If the fetched data is less than the limit, assume there is no more data
        if (newPacks.length < initialLimit) {
          setHasMore(false);
        }

        // Append the new data or reset if it's the first page
        setData((prevData) => (page === initialPage ? newPacks : [...prevData, ...newPacks]));
        
        setIsLoading(false);
        setIsFetchingNextPage(false);
      }
    };

    processFetchedData();
  }, [fetchedData, page, initialLimit]);

  // Prevent fetching more data if a request is already in progress or there is no more data
  const fetchNextPage = useCallback(async () => {
    if (hasMore && !isFetchingNextPage && !isLoading) {
      setIsFetchingNextPage(true);
      setPage((prevPage) => prevPage + 1); // Update the page
      await refetch(); // Refetch data for the new page
    }
  }, [hasMore, isFetchingNextPage, isLoading, refetch]);

  return {
    data,
    error,
    isLoading,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    setPage,
  };
};
