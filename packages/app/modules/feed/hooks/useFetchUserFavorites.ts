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
  options: {
    queryEnabled: boolean;
    isPreview: boolean;
    searchTerm: string;
    isPublic: boolean;
  },
) => {
  const {
    queryEnabled = true,
    isPreview = false,
    searchTerm = '',
    isPublic = true,
  } = options || {};
  const enabled = !!userId && queryEnabled;
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );

  const { data, error, isLoading, refetch } =
    queryTrpc.getUserFavorites.useQuery(
      {
        userId,
        pagination,
        isPreview,
        searchTerm,
        isPublic: isPublic ?? false,
      },
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
    totalCount: data?.totalCount ?? 0,
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
  isPublic: boolean = true,
): FetchUserFavoritesReturn => {
  const { isAllQueryEnabled, ...previewResourceState } =
    usePreviewResourceState();
  const {
    data: previewData,
    isLoading: isPreviewLoading,
    totalCount,
  } = useFetchUserFavorites(userId, {
    isPreview: true,
    isPublic: isPublic ?? false,
    queryEnabled: true,
    searchTerm: '',
  });

  const {
    data: allQueryData,
    isLoading: isAllQueryLoading,
    fetchPrevPage,
    fetchNextPage,
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
  } = useFetchUserFavorites(userId, {
    queryEnabled: isAllQueryEnabled,
    searchTerm,
    isPublic: isPublic ?? true,
    isPreview: false,
  });

  return {
    ...previewResourceState,
    resourceName: 'Favorites',
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
