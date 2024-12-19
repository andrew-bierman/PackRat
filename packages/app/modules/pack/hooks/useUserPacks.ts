import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  usePagination,
  type PaginationParams,
} from 'app/hooks/pagination';
import {
  type PreviewResourceStateWithData,
  usePreviewResourceState,
} from 'app/hooks/common';
import { useEffect, useMemo, useState } from 'react';

interface QueryOptions {
  isPublic?: boolean;
  isPreview?: boolean;
  searchTerm?: string;
  itemId?: string;
}

export const useUserPacks = (
  ownerId: string,
  options: QueryOptions = {},
  queryString = '',
  queryEnabled = false,
) => {
  const { isPublic, searchTerm, isPreview, itemId } = options;
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );
  const utils = queryTrpc.useContext();
  const enabled = queryEnabled && !!ownerId;
  const queryParams = useMemo(
    () => ({
      ownerId,
      isPublic,
      queryBy: queryString,
      pagination,
      searchTerm,
      isPreview,
      itemId,
    }),
    [isPublic, isPreview, searchTerm, pagination, ownerId, itemId, queryString],
  );
  const { data, isError, isLoading, refetch } =
    queryTrpc.getUserPacksFeed.useQuery(queryParams, {
      enabled,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60,
      cacheTime: 60 * 60 * 24,
      networkMode: 'offlineFirst',
    });
  utils.getPacks.setData({
    ownerId: ownerId || '',
    queryBy: queryString,
  });

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
  }, [searchTerm, ownerId]);

  return {
    data: data?.data || [],
    isLoading,
    isError,
    totalCount: data?.totalCount,
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

interface FetchUserPacksPreviewReturn extends PreviewResourceStateWithData {
  totalCount: number;
  fetchNextPage: () => void;
  nextPage?: number;
}

export const useUserPacksWithPreview = (
  userId: string,
  searchTerm: string,
  isPublic?: boolean,
): FetchUserPacksPreviewReturn => {
  const { isAllQueryEnabled, ...previewResourceState } =
    usePreviewResourceState();
  const {
    data: previewData,
    isLoading: isPreviewLoading,
    totalCount,
  } = useUserPacks(userId, { isPreview: true, isPublic }, 'Most Recent', true);

  const {
    data: allQueryData,
    isLoading: isAllQueryLoading,
    fetchPrevPage,
    fetchNextPage,
    hasPrevPage,
    hasNextPage,
    currentPage,
    totalPages,
  } = useUserPacks(userId, { isPublic, searchTerm }, 'Most Recent', true);

  return {
    ...previewResourceState,
    resourceName: 'Packs',
    isAllQueryEnabled,
    previewData,
    isPreviewLoading,
    allQueryData,
    isAllQueryLoading,
    totalCount,
    fetchPrevPage,
    fetchNextPage,
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
  };
};
