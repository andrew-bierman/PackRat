import { useMemo, useState } from 'react';
import { useItems } from 'app/modules/item';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';

export const useSearchItem = () => {
  const [packId] = usePackId();
  const currentPack = useFetchSinglePack(packId);

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

  return { searchString, setSearchString, results };
};
