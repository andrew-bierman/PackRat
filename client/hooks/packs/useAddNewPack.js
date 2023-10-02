import { store } from '../../store/store';
import { addPackReducer } from '../../store/packsStore';
import { queryTrpc } from '../../trpc';

export const useAddNewPack = () => {
  const mutation = queryTrpc.addPack.useMutation();

  const onSuccesMutation = (data) => store.dispatch(addPackReducer(data));
  return { mutation, onSuccesMutation };
};
