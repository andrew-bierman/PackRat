import { queryTrpc } from 'app/trpc';

export function useAddFavorite() {
  const utils = queryTrpc.useContext();

  const mutation = queryTrpc.addToFavorite.useMutation();

  // A wrapper function to abstract away the .mutate call
  const addFavorite = (newFavorite, userId?: string) => {
    mutation.mutate(newFavorite, {
      onSuccess: () => {
        // Invalidate and refetch. Update to be more specific
        utils.getUserFavorites.invalidate();
        utils.getUserPacksFeed.invalidate();
        utils.getPublicFeed.invalidate();
        utils.getPacks.invalidate(userId ? { ownerId: userId } : undefined);
      },
    });
  };

  // Return the wrapper function and any other data or functions you might need
  return {
    addFavorite,
    ...mutation, // This spreads in other properties like isLoading, isError, etc.
  };
}
