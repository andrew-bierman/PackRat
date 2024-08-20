import { usePagination, useQueryUpdater } from 'app/hooks/common';
import { queryTrpc } from 'app/trpc';

export const useItemsUpdater = () => {
  const { limit, page } = usePagination();
  const updateItems = useQueryUpdater(queryTrpc.getItemsGlobally, {
    limit,
    page,
    searchString: '',
  });

  return updateItems;
};
