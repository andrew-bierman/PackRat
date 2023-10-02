import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { deletePackItemReducer } from '../../store/packsStore';

export const useDeletePackItem = (item) => {
  const { data, isLoading, error, refetch } = queryTrpc.deleteItem
    .useMutation()
    .mutate({
      itemId: item.itemId,
      packId: item.currentPackId,
    });
  if (!error) {
    store.dispatch(deletePackItemReducer(data));
  }
  return { mutation };
};
