import { store } from '../store/store';
import { queryTrpc } from '../trpc';

export const useMutation = (route, reducer) => {
  const mutation = queryTrpc.useMutation([route]);

  const onSuccesMutation = (data) => store.dispatch(scorePackReducer(data));
  return { mutation, onSuccesMutation: reducer ? onSuccesMutation : null };
};
