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
  data: {
    id: string;
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
    owner_id: string | null;
    bounds: [number[], number[]] | null;
    minZoom: number;
    maxZoom: number;
    metadata: {
      shape: string;
    } | null;
  }[];
  totalCount: number;
  nextOffset?: number;
}

export const useOfflineMaps = ({ enabled = true, search = '' } = {}) => {
  console.log({ search });
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const authUser = useAuthUser();
  const { data, isLoading, refetch } =
    queryTrpc.getOfflineMaps.useQuery<OfflineMapsResponse>(
      {
        ownerId: authUser?.id,
        search,
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
