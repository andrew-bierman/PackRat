import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  useInfinitePagination,
  type PaginationParams,
} from 'app/hooks/pagination';
import { useState } from 'react';

interface QueryOptions {
  isPublic?: boolean;
  searchTerm?: string;
}

export const useUserPacks = (
  ownerId: string,
  options: QueryOptions = {},
  queryString = '',
  queryEnabled = false,
) => {
  const { isPublic, searchTerm } = options;
  const [allData, setAllData] = useState([]);
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const utils = queryTrpc.useContext();
  const enabled = queryEnabled && !!ownerId;
  const { data, error, isLoading, refetch } =
    queryTrpc.getUserPacksFeed.useQuery(
      { ownerId, isPublic, queryBy: queryString, pagination, searchTerm },
      {
        enabled,
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        onSuccess: (newData) => {
          console.log('newData', newData);
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
  utils.getPacks.setData({
    ownerId: ownerId || '',
    queryBy: queryString,
  });

  const { fetchNextPage } = useInfinitePagination(
    refetch,
    pagination,
    setPagination,
    { nextPage: data?.nextOffset, enabled },
  );

  // Extract packs or set an empty array if data is undefined.

  return {
    data: allData,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
  };
};
