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
import { useEffect, useState } from 'react';

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
      },
    );
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
    fetchPrevPage,
    fetchNextPage,
    totalCount,
    hasPrevPage,
    hasNextPage,
    currentPage,
    totalPages,
  } = useUserPacks(userId, { isPublic: true, searchTerm }, 'Most Recent', true);

  return {
    ...previewResourceState,
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
