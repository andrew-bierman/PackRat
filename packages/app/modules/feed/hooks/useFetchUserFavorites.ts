import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  usePagination,
} from 'app/hooks/pagination';
import { useEffect, useState } from 'react';
import {
  type PreviewResourceStateWithData,
  usePreviewResourceState,
} from 'app/hooks/common';

export const useFetchUserFavorites = (
  userId: string,
  { queryEnabled = true, isPreview = false, searchTerm = '' } = {},
) => {
  const enabled = !!userId && queryEnabled;
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );

  const { data, error, isLoading, refetch } =
    queryTrpc.getUserFavorites.useQuery(
      { userId, pagination, isPreview, searchTerm },
      {
        enabled,
        refetchOnWindowFocus: false,
      },
    );
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
  }, [searchTerm, userId]);

  return {
    data: data?.data || [],
    totalCount: data?.totalCount,
    error,
    isLoading,
    enabled,
    refetch,
    fetchPrevPage,
    fetchNextPage,
    hasPrevPage: data?.prevOffset !== false,
    hasNextPage: data?.nextOffset !== false,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
  };
};

interface FetchUserFavoritesReturn extends PreviewResourceStateWithData {
  totalCount: number;
}
export const useFetchUserFavoritesWithPreview = (
  userId: string,
  searchTerm: string,
): FetchUserFavoritesReturn => {
  const { isAllQueryEnabled, ...previewResourceState } =
    usePreviewResourceState();
  const { data: previewData, isLoading: isPreviewLoading } =
    useFetchUserFavorites(userId, { isPreview: true });

  const {
    data: allQueryData,
    isLoading: isAllQueryLoading,
    totalCount,
    fetchPrevPage,
    fetchNextPage,
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
  } = useFetchUserFavorites(userId, {
    queryEnabled: isAllQueryEnabled,
    searchTerm,
  });

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
