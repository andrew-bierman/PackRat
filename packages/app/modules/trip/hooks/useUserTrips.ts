import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  useInfinitePagination,
  type PaginationParams,
} from 'app/hooks/pagination';
import {
  type PreviewResourceStateWithData,
  usePreviewResourceState,
} from 'app/hooks/common';
import { useState } from 'react';

export const useUserTrips = (
  ownerId: string | undefined,
  params?: { searchTerm: string; isPublic?: boolean },
  queryEnabled: boolean = true,
) => {
  const [allData, setAllData] = useState([]);
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const enabled = queryEnabled && !!ownerId;
  const { searchTerm, isPublic } = params || {};

  // Leverage the query hook provided by tRPC
  const { data, error, isLoading, refetch } =
    queryTrpc.getUserTripsFeed.useQuery(
      { ownerId, searchTerm, queryBy: 'Most Recent', pagination, isPublic },
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

  return {
    data: allData,
    totalCount: data?.totaLCount,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
  };
};

interface FetchUserTripsPreviewReturn extends PreviewResourceStateWithData {
  totalCount?: number;
  fetchNextPage: () => void;
  nextPage?: number;
}

export const useUserTripsWithPreview = (
  userId: string,
): FetchUserTripsPreviewReturn => {
  const { isAllQueryEnabled, ...previewResourceState } =
    usePreviewResourceState();
  const {
    data: previewData,
    isLoading: isPreviewLoading,
    fetchNextPage,
    nextPage,
  } = useUserTrips(userId, { isPublic: true, searchTerm: '' }, true);

  const {
    data: allQueryData,
    isLoading: isAllQueryLoading,
    totalCount,
  } = useUserTrips(
    userId,
    { isPublic: true, searchTerm: '' },
    isAllQueryEnabled,
  );

  return {
    ...previewResourceState,
    isAllQueryEnabled,
    previewData,
    isPreviewLoading,
    allQueryData,
    isAllQueryLoading,
    totalCount,
    fetchNextPage,
    nextPage,
  };
};
