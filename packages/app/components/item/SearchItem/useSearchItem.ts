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
    const ownerId = user.id;
    const packId = window.location.pathname.substring('/pack/'.length);
    const itemId = item?.id;

    // TODO add optimistic updates
    (async () => {
      try {
        // Works but we have to refresh (Incomplete)
        await trpc.addGlobalItemToPack.mutate({ itemId, ownerId, packId });
      } catch {}
    })();

    return '';
  };

  return { searchString, setSearchString, results, handleSearchResultClick };
};
