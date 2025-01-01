import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  usePagination,
} from 'app/hooks/pagination';
import { useState } from 'react';
import { useAuthUser } from 'app/modules/auth';

// Add the OfflineMapsResponse interface with nextOffset
interface OfflineMapsResponse {
  data?: {
    id?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    owner_id?: string;
    bounds?: [number[], number[]];
    minZoom?: number;
    maxZoom?: number;
    metadata?: {
      shape?: string;
    };
  }[];
  totalCount?: number;
  nextOffset?: number;
}

export const useOfflineMaps = (enabled = true) => {
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const authUser = useAuthUser();
  const { data, isLoading, refetch } =
    queryTrpc.getOfflineMaps.useQuery<OfflineMapsResponse>(
      {
        ownerId: authUser?.id,
        pagination,
      },
      {
        enabled,
        refetchOnWindowFocus: false,
        onError: (error) =>
          console.error('Error fetching public packs:', error),
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
