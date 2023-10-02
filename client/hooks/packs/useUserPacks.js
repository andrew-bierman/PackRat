import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { setUserPacks } from '../../store/packsStore';
import { useState } from 'react';

export const useUserPacks = (ownerId, queryString) => {
  // If ownerId is not provided, don’t run the query.
  const enabled = !!ownerId;
  const [isSet, setIsSet] = useState(false);

  // Leverage the query hook provided by tRPC
  const { data, error, isLoading, refetch } = queryTrpc.getPacks.useQuery(
    { ownerId, queryBy: queryString },
    {
      enabled, // This query will run only if 'enabled' is true.
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  // Extract packs or set an empty array if data is undefined.
  const packs = data?.packs || [];

  if (packs && !isSet) {
    store.dispatch(setUserPacks(packs));
    setIsSet(true);
  }

  return { data: packs, error, isLoading, refetch };
};
