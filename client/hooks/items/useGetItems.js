import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { setItems } from '../../store/itemsStore';

const useGetItems = ({ packId }) => {
  const { data, isLoading, error } = queryTrpc.getItems.useQuery(
    {
      packId,
    },
    {
      enabled: !!packId,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  if (data) {
    store.dispatch(setItems(data));
  }

  return { data, error, isLoading };
};

export default useGetItems;
