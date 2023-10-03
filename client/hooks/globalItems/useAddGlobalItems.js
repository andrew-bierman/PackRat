import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { addItemsGlobalReducer } from '../../store/globalItemsStore';

const useAddGlobalItems = (newItem) => {
  const enabled = !!newItem;

  const mutation = queryTrpc.addItemGlobal.useMutation();

  const { data, isLoading, error, refetch } = mutation.mutate(
    {
      name: newItem.name,
      packId: newItem.packId,
      quantity: newItem.quantity,
      type: newItem.type,
      weight: newItem.weight,
      unit: newItem.unit,
    },
    {
      enabled,
    },
  );

  if (data) {
    store.dispatch(addItemsGlobalReducer(data));
  }

  return { data, error, isLoading, refetch };
};

export default useAddGlobalItems;
