import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { setGlobalItems } from '../../store/globalItemsStore';

const useGetGlobalItems = (limit, page) => {
  const { data, isLoading, error, refetch } =
    queryTrpc.getItemsGlobally.useQuery(
      {
        limit,
        page,
      },
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

  if (data) {
    store.dispatch(setGlobalItems(data));
  }

  return { data, error, isLoading, refetch };
};

export default useGetGlobalItems;
