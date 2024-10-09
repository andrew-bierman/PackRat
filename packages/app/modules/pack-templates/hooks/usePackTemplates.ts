import { queryTrpc } from 'app/trpc';
import {
  PaginationParams,
  getPaginationInitialParams,
  usePagination,
} from 'app/hooks/pagination';
import { useEffect, useState } from 'react';

export const usePackTemplates = (
  { searchQuery, orderBy },
  enabled: boolean = true,
) => {
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );

  const { data, error, isLoading, refetch } =
    queryTrpc.getPackTemplates.useQuery(
      {
        filter: { searchQuery },
        orderBy,
        pagination,
      },
      {
        enabled,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
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
  }, [searchQuery]);

  return {
    data: data?.data,
    error,
    isLoading,
    refetch,
    totalCount: data?.totalCount,
    fetchPrevPage,
    fetchNextPage,
    hasPrevPage: data?.prevOffset !== false,
    hasNextPage: data?.nextOffset !== false,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
  };
};
