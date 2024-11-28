import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  usePagination,
} from 'app/hooks/pagination';
import { useState } from 'react';
import { useAuthUser } from 'app/modules/auth';

export const useOfflineMaps = (enabled = true) => {
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const authUser = useAuthUser();
  const { data, isLoading, refetch } = queryTrpc.getOfflineMaps.useQuery(
    {
      ownerId: authUser.id,
      pagination,
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
    { nextPage: data?.nextOffset },
  );

  return {
    data: data?.data,
    isLoading,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
    error: null,
  };
};
