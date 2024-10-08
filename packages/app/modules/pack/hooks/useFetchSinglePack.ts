import { useAuthUser } from 'app/modules/auth';
import { queryTrpc } from 'app/trpc';
import { useItemWeightUnit } from 'app/modules/item';
import { SMALLEST_ITEM_UNIT } from 'app/modules/item/constants';
import { useMemo } from 'react';
import { convertWeight } from 'app/utils/convertWeight';

export const useFetchSinglePack = (packId) => {
  const [wightUnit] = useItemWeightUnit();
  const user = useAuthUser();
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getPackById.useQuery(
      { packId },
      {
        enabled: !!packId, // to ensure the query runs only when packId is available
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );
  const isOwner = data && user && data.owner_id === user.id;

  return { refetch, data, error, isLoading, isOwner, isError };
};
