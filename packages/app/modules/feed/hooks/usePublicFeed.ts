import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  usePagination,
} from 'app/hooks/pagination';
import { useEffect, useState } from 'react';

export const usePublicFeed = (
  queryBy,
  searchQuery: string,
  selectedTypes,
  enabled = false,
) => {
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const { data, isLoading, refetch } = queryTrpc.getPublicFeed.useQuery(
    {
      queryBy: queryBy ?? 'Favorites',
      pagination,
      searchTerm: searchQuery,
      excludeType: getExcludeType(selectedTypes),
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
  }, [queryBy, searchQuery, selectedTypes?.pack, selectedTypes?.trip]);

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

const getExcludeType = (selectedTypes: { pack?: boolean; trip?: boolean }) => {
  const { pack, trip } = selectedTypes || {};
  if (pack && trip) {
    return undefined;
  }

  if (!pack) {
    return 'packs';
  }

  if (!trip) {
    return 'trips';
  }
};
