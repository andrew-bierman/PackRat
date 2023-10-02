import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { deleteItemReducer } from '../../store/itemsStore';

const useDeleteItems = ({ itemId }) => {
  const { data, isLoading, error } = queryTrpc.deleteItem.useMutation().mutate(
    { itemId },
    {
      enabled: !!itemId,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
  if (data) {
    store.dispatch(deleteItemReducer(data));
  }

  return { data, error, isLoading };
};

export default useDeleteItems;
