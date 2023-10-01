import { queryTrpc } from '../../trpc';

export const useUserPacks = (ownerId, queryString) => {
  let data = [];
  let isLoading = true;

  if (!ownerId) return { data, error: null, isLoading: false };

  try {
    const userPacks = queryTrpc.getPacks.useQuery(
      { ownerId, queryBy: queryString },
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

    isLoading = userPacks?.status !== 'success';

    if (userPacks?.status === 'success') data = userPacks.data.packs;
  } catch (error) {
    console.error(error);
    return { data: null, error, isLoading };
  }

  return { data, error: null, isLoading };
};
