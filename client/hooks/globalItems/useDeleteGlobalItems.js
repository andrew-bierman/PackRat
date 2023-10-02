import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { deleteItemsGlobalReducer } from '../../store/globalItemsStore';

const useDeleteGlobalItems = (item) => {
  const { data, isLoading, error, refetch } = queryTrpc.deleteGlobalItem
    .useMutation()
    .mutate(
      { itemId: item },
      {
        enabled: !!item,
      },
    );

  if (!error) {
    store.dispatch(deleteItemsGlobalReducer(data));
  }

  return { data, error, isLoading, refetch };
};

export default useDeleteGlobalItems;
