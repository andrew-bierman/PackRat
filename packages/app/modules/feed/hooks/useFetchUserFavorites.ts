import { queryTrpc } from 'app/trpc';
import {
  getPaginationInitialParams,
  type PaginationParams,
  useInfinitePagination,
} from 'app/hooks/pagination';
import { useEffect, useState } from 'react';
import {
  type PreviewResourceStateWithData,
  usePreviewResourceState,
} from 'app/hooks/common';

export const useFetchUserFavorites = (
  userId: string,
  { queryEnabled = true, isPreview = false } = {},
) => {
  const enabled = !!userId && queryEnabled;
  const [allData, setAllData] = useState();
  const [pagination, setPagination] = useState<PaginationParams>(
    getPaginationInitialParams(),
  );

  const { data, error, isLoading, refetch } =
    queryTrpc.getUserFavorites.useQuery(
      { userId, pagination, isPreview },
      {
        enabled,
        refetchOnWindowFocus: false,
      },
    );
  const { fetchNextPage } = useInfinitePagination(
    refetch,
    pagination,
    setPagination,
    { nextPage: data?.nextOffset, enabled },
  );

  useEffect(() => {
    if (data?.data) {
      setAllData((prevData) => {
        if (pagination.offset === 0) {
          return data.data;
        }

        return [...(Array.isArray(prevData) ? prevData : []), ...data.data];
      });
    }
  }, [data]);

  return {
    data: allData,
    totalCount: data?.totalCount,
    error,
    isLoading,
    enabled,
    refetch,
    fetchNextPage,
    nextPage: data?.nextOffset || false,
  };
};

interface FetchUserFavoritesReturn extends PreviewResourceStateWithData {
  totalCount: number;
}
export const useFetchUserFavoritesWithPreview = (
  userId: string,
): FetchUserFavoritesReturn => {
  const { isAllQueryEnabled, ...previewResourceState } =
    usePreviewResourceState();
  const { data: previewData, isLoading: isPreviewLoading } =
    useFetchUserFavorites(userId, { isPreview: true });

  const {
    data: allQueryData,
    isLoading: isAllQueryLoading,
    totalCount,
    fetchNextPage,
    nextPage,
  } = useFetchUserFavorites(userId, { queryEnabled: isAllQueryEnabled });

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
