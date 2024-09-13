import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  useInfinitePagination,
} from 'app/hooks/pagination';
import { useState } from 'react';

export const usePublicFeed = (
  queryBy,
  searchQuery: string,
  selectedTypes,
  enabled = false,
) => {
  const [allData, setAllData] = useState([]);
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const { data, isLoading, refetch } = queryTrpc.getPublicFeed.useQuery(
    { queryBy: queryBy ?? 'Favorites', pagination, searchTerm: searchQuery },
    {
      enabled,
      refetchOnWindowFocus: false,
      onSuccess: (newData) => {
        if (newData?.data) {
          setAllData((prevData) => {
            if (pagination.offset === 0) {
              return newData.data;
            }

            return [...prevData, ...newData.data];
          });
        }
      },
      onError: (error) => console.error('Error fetching public packs:', error),
    },
  );
  const { fetchNextPage } = useInfinitePagination(
    refetch,
    pagination,
    setPagination,
    { nextPage: data?.nextOffset, enabled },
  );

  return {
    data: allData,
    isLoading,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
    error: null,
  };
};
