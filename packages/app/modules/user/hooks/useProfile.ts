import { useFetchUserFavoritesWithPreview } from 'app/modules/feed';
import { useUserPacksWithPreview } from 'app/modules/pack';
import { useAuthUser, useMatchesCurrentUser } from 'app/modules/auth';
import { useGetUser } from './useGetUser';
import { useUserTripsWithPreview } from 'app/modules/trip/hooks/useUserTrips';
import { useCallback, useState } from 'react';
import type { PreviewListType } from '../model';

export const useProfile = (id = null) => {
  const authUser = useAuthUser();
  const userId = id ?? authUser?.id;
  const [searchTerms, setSearchTerms] = useState<
    Record<PreviewListType, string>
  >({ favorites: '', packs: '', trips: '' });

  const isCurrentUser = useMatchesCurrentUser(userId as string); // TODO: Implement this hook in more components

  const favoritesQuery = useFetchUserFavoritesWithPreview(
    userId as string,
    searchTerms.favorites,
  );
  const userPacksQuery = useUserPacksWithPreview(
    userId as string,
    searchTerms.packs,
  );
  const userTripsQuery = useUserTripsWithPreview(
    userId as string,
    searchTerms.trips,
  );

  const onSearchChange = useCallback(
    (search: string, type: PreviewListType) => {
      setSearchTerms((prev) => ({ ...prev, [type]: search }));
    },
    [],
  );

  const { data: userData, isLoading: userIsLoading } = useGetUser(
    userId as string,
  );

  const user = !isCurrentUser ? userData : authUser;

  const isLoading =
    userIsLoading ||
    userPacksQuery.isPreviewLoading ||
    userTripsQuery.isPreviewLoading ||
    favoritesQuery.isPreviewLoading;

  const error = '';

  return {
    user,
    favoritesQuery,
    userPacksQuery,
    userTripsQuery,
    tripsCount: userTripsQuery.totalCount,
    packsCount: userPacksQuery.totalCount,
    favoritesCount: favoritesQuery.totalCount,
    isLoading,
    error,
    isCurrentUser,
    searchTerms,
    onSearchChange,
  };
};
