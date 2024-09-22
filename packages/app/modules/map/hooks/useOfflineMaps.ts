import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  useInfinitePagination,
} from 'app/hooks/pagination';
import { useState } from 'react';
import { useAuthUser } from 'app/modules/auth';

export const useOfflineMaps = () => {
  const [allData, setAllData] = useState([]);
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
      refetchOnWindowFocus: false,
      onSuccess: (newData) => {
        if (newData?.offlineMaps) {
          setAllData((prevData) => {
            if (pagination.offset === 0) {
              return newData.offlineMaps;
            }

            return [...prevData, ...newData.offlineMaps];
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
    { nextPage: data?.nextOffset },
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
