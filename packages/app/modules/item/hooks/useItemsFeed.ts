import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  usePagination,
} from 'app/hooks/pagination';
import { useEffect, useState } from 'react';

export const useItemsFeed = (
  queryBy = '',
  searchQuery = '',
  enabled = true,
) => {
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const { data, isLoading, refetch } = queryTrpc.getItemsFeed.useQuery(
    {
      queryBy: queryBy ?? 'Most Recent',
      pagination,
      searchTerm: searchQuery,
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      onError: (error) => console.error('Error fetching public packs:', error),
    },
  );
  const { fetchPrevPage, fetchNextPage } = usePagination(
    refetch,
    pagination,
    setPagination,
    {
      prevPage: data?.prevOffset,
      nextPage: data?.nextOffset,
      enabled,
    },
  );

  useEffect(() => {
    setPagination(getPaginationInitialParams());
  }, [queryBy, searchQuery]);

  return {
    data: data?.data || [],
    isLoading,
    refetch,
    fetchPrevPage,
    fetchNextPage,
    hasPrevPage: data?.prevOffset !== false,
    hasNextPage: data?.nextOffset !== false,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
    error: null,
  };
};
