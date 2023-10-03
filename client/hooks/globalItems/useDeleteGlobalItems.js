import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { deleteItemsGlobalReducer } from '../../store/globalItemsStore';

const useDeleteGlobalItems = () => {
  const mutation = queryTrpc.deleteGlobalItem.useMutation();
  // .mutate(
  //   { itemId: item },
  //   {
  //     enabled: !!item,
  //   },
  // );

  const onSuccesMutation = (data) =>
    store.dispatch(deletePackItemReducer(data));

  return { mutation, deleteItemsGlobalReducer };
};

export default useDeleteGlobalItems;
