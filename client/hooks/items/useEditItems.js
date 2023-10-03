import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { editItemReducer } from '../../store/itemsStore';

const useEditItems = (newItem) => {
  const { data, isLoading, error } = queryTrpc.editItem.useMutation().mutate({
    _id: newItem._id,
    name: newItem.name,
    quantity: newItem.quantity,
    type: newItem.type,
    weight: newItem.weight,
    unit: newItem.unit,
  });
  if (data) {
    store.dispatch(editItemReducer(data));
  }

  return { data, error, isLoading };
};

export default useEditItems;
