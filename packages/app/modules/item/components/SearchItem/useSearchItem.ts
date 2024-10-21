import { useMemo, useState } from 'react';
import { useUserItems, useTogglePackItem } from 'app/modules/item';
import { useAuthUser } from 'app/modules/auth';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';

export const useSearchItem = () => {
  const [packId] = usePackId();
  const currentPack = useFetchSinglePack(packId);
  const { togglePackItem } = useTogglePackItem();

  const user = useAuthUser();
  const [searchString, setSearchString] = useState('');

  const itemFilters = useMemo(() => {
    return {
      limit: 5,
      page: 0,
      searchString,
    };
  }, [searchString]);

  const { data } = useUserItems(itemFilters);
  const results = useMemo(() => {
    const packItems = currentPack?.data?.items;
    if (!Array.isArray(data?.items)) {
      return [];
    }

    return data.items.map((item) => {
      if (!Array.isArray(packItems)) {
        return item;
      }

      return {
        ...item,
        isDisabled: packItems.some(({ id }) => id === item.id),
      };
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
        await togglePackItem({ itemId, packId });
      } catch {}
    })();

    return '';
  };

  return { searchString, setSearchString, results, handleSearchResultClick };
};
