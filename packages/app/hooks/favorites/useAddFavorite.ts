import { queryTrpc } from '../../trpc';

export function useAddFavorite() {
  const utils = queryTrpc.useContext();

  const mutation = queryTrpc.addToFavorite.useMutation();

  // A wrapper function to abstract away the .mutate call
  const addFavorite = (newFavorite) => {
    
    mutation.mutate(newFavorite, {
      onSuccess: () => {
        // Invalidate and refetch. Update to be more specific
        utils.getFavoritePacksByUser.invalidate();
        utils.getPublicPacks.invalidate();
      },
    });
  };

  // Return the wrapper function and any other data or functions you might need
  return {
    addFavorite,
    ...mutation, // This spreads in other properties like isLoading, isError, etc.
  };
}
