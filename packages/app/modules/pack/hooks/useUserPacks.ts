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

interface QueryOptions {
  isPublic?: boolean;
  isPreview?: boolean;
  searchTerm?: string;
}

export const useUserPacks = (
  ownerId: string,
  options: QueryOptions = {},
  queryString = '',
  queryEnabled = false,
) => {
  const { isPublic, searchTerm, isPreview } = options;
  const [allData, setAllData] = useState([]);
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const utils = queryTrpc.useContext();
  const enabled = queryEnabled && !!ownerId;
  const { data, error, isLoading, refetch } =
    queryTrpc.getUserPacksFeed.useQuery(
      {
        ownerId,
        isPublic,
        queryBy: queryString,
        pagination,
        searchTerm,
        isPreview,
      },
      {
        enabled,
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
    totalCount: data?.totalCount,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
  };
};

interface FetchUserPacksPreviewReturn extends PreviewResourceStateWithData {
  totalCount: number;
  fetchNextPage: () => void;
  nextPage?: number;
}

export const useUserPacksWithPreview = (
  userId: string,
): FetchUserPacksPreviewReturn => {
  const { isAllQueryEnabled, ...previewResourceState } =
    usePreviewResourceState();
  const { data: previewData, isLoading: isPreviewLoading } = useUserPacks(
    userId,
    { isPublic: true, isPreview: true },
    'Most Recent',
    true,
  );

  const {
    data: allQueryData,
    isLoading: isAllQueryLoading,
    fetchNextPage,
    nextPage,
    totalCount,
  } = useUserPacks(userId, { isPublic: true }, 'Most Recent', true);

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
