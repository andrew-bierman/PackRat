import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  useInfinitePagination,
  type PaginationParams,
} from 'app/hooks/pagination';
import { useState } from 'react';

export const useUserTrips = (
  ownerId: string | undefined,
  params?: { searchTerm: string },
  queryEnabled: boolean = true,
) => {
  const [allData, setAllData] = useState([]);
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const enabled = queryEnabled && !!ownerId;
  const { searchTerm } = params || {};

  // Leverage the query hook provided by tRPC
  const { data, error, isLoading, refetch } =
    queryTrpc.getUserTripsFeed.useQuery(
      { ownerId, searchTerm, queryBy: 'Most Recent', pagination },
      {
        enabled, // This query will run only if 'enabled' is true.
        refetchOnWindowFocus: false,
        keepPreviousData: true,
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
      },
    );

  const { fetchNextPage } = useInfinitePagination(
    refetch,
    pagination,
    setPagination,
    { nextPage: data?.nextOffset, enabled },
  );

  // Extract trips or set an empty array if data is undefined.
  // const trips = data?.trips || [];

  return {
    data: allData,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
  };
};
