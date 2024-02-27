import { queryTrpc } from '../../trpc';

export function useGetUserChats(userId) {
  const query = queryTrpc.getUserChats.useQuery(
    { userId },
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const SelectById = (id) => {
    return query.data?.find((chat) => chat.id === id);
  };

  return {
    ...query, // This spreads in properties like data, isLoading, isError, etc.
  };
}
