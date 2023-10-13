import { useQuery, useMutation } from 'react-query';
import { trpc } from 'trpc';

export function useUserChatsQuery(userId) {
  return useQuery(['userChats', userId], () =>
    trpc.getUserChats.query({ userId }),
  );
}

export function useAIResponseQuery(userId, conversationId, userInput) {
  return useQuery(['aiResponse', userId, conversationId, userInput], () => {
    return trpc.getAIResponse.query({ userId, conversationId, userInput });
  });
}

export function useProcessGeoJSONMutation() {
  return useMutation((data) =>
    trpc.postSingleGeoJSON.mutate({ geojson: data }),
  );
}

export function useGetDestinationQuery(destinationId) {
  return useQuery(['destination', destinationId], () =>
    trpc.getDestination.query({ id: destinationId }),
  );
}

export function usePhotonDetailsQuery(data) {
  return useQuery(['photonDetails', data], () =>
    trpc.getPhotonDetails.query(data),
  );
}

export function useAddFavoriteMutation() {
  return useMutation((newFavorite) => trpc.addToFavorite.mutate(newFavorite));
}

export function useFetchFavoritesQuery() {
  return useQuery('fetchFavorites', () =>
    trpc.addToFavorite.mutate({ packId: '', userId: '' }),
  );
}

export function useFetchUserFavoritesQuery(userId) {
  return useQuery(['fetchUserFavorites', userId], () =>
    trpc.getUserFavorites.query({ userId }),
  );
}

export function useFetchFavoritePacksQuery(userId) {
  return useQuery(['fetchFavoritePacks', userId], () =>
    trpc.getFavoritePacksByUser.query({ userId }),
  );
}