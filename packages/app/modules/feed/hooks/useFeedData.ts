import { useState, useCallback } from 'react';
import { useFeed } from 'app/modules/feed';
import { useAuthUser } from 'app/modules/auth';

export const useFeedData = ({ queryString, feedType, selectedTypes }) => {
  const [refreshing, setRefreshing] = useState(false);
  const user = useAuthUser();
  const ownerId = user?.id;

  const { data, isLoading, hasMore, fetchNextPage, refetch, isFetchingNextPage } = useFeed({
    queryString,
    ownerId,
    feedType,
    selectedTypes,
  });

  // Refresh data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch && refetch();
    setRefreshing(false);
  }, [refetch]);

  return {
    data,
    isLoading,
    hasMore,
    fetchNextPage,
    refetch,
    refreshing,
    onRefresh,
    isFetchingNextPage,
  };
};
