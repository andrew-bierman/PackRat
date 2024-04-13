import { useMemo, useState } from 'react';
import { useItems } from 'app/hooks/items';
import { trpc } from 'app/trpc';
import { useAuthUser } from 'app/auth/hooks';

export const useSearchItem = () => {
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
  const results = data?.items || [];

  const handleSearchResultClick = (item) => {
    const ownerId = user._id;
    const packId = window.location.pathname.substring('/path/'.length);
    const itemId = item?._id;

    // TODO add optimistic updates
    (async () => {
      try {
        await trpc.addGlobalItemToPack.query({ itemId, ownerId, packId });
      } catch {}
    })();

    return '';
  };

  return { searchString, setSearchString, results, handleSearchResultClick };
};
