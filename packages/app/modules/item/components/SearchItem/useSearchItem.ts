import { useMemo, useState } from 'react';
import { useItems } from 'app/modules/item';
import { queryTrpc } from 'app/trpc';
import { useAuthUser } from 'app/modules/auth';
import { useFetchSinglePack, usePackId } from 'app/hooks/packs';

export const useSearchItem = () => {
  const [packId] = usePackId();
  const currentPack = useFetchSinglePack(packId);
  const { mutateAsync: addItemToPack } =
    queryTrpc.addGlobalItemToPack.useMutation();
  const utils = queryTrpc.useUtils();

  const user = useAuthUser();
  const [searchString, setSearchString] = useState('');

  const itemFilters = useMemo(() => {
    return {
      limit: 5,
      page: 0,
      searchString,
    };
  }, [searchString]);

  const { data } = useItems(itemFilters);
  const results = useMemo(() => {
    const packItems = currentPack?.data?.items;
    if (!Array.isArray(data?.items)) {
      return [];
    }

    return data.items.filter((globalItem) => {
      if (!Array.isArray(packItems)) {
        return true;
      }

      return !packItems.some(({ id }) => id === globalItem.id);
    });
  }, [data]);

  const handleSearchResultClick = (item) => {
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const ownerId = user.id;
    const itemId = item?.id;

    (async () => {
      try {
        await addItemToPack({ itemId, ownerId, packId });
        utils.getPackById.invalidate();
      } catch {}
    })();

    return '';
  };

  return { searchString, setSearchString, results, handleSearchResultClick };
};
