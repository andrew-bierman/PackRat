import { useFetchUserFavoritesWithPreview } from 'app/modules/feed';
import { useUserPacksWithPreview } from 'app/modules/pack';
import { useAuthUser, useMatchesCurrentUser } from 'app/modules/auth';
import { useGetUser } from './useGetUser';
import { useUserTripsWithPreview } from 'app/modules/trip/hooks/useUserTrips';

export const useProfile = (id = null) => {
  const authUser = useAuthUser();
  const userId = id ?? authUser?.id;

  const isCurrentUser = useMatchesCurrentUser(userId as string); // TODO: Implement this hook in more components

  const favoritesQuery = useFetchUserFavoritesWithPreview(userId as string);
  const userPacksQuery = useUserPacksWithPreview(userId as string);
  const userTripsQuery = useUserTripsWithPreview(userId as string);

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
  };
};
