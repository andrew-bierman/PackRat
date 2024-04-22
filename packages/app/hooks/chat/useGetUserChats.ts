import { queryTrpc } from '../../trpc';

export function useGetUserChats(userId, itemTypeId) {
  const query = queryTrpc.getUserChats.useQuery(
    { userId, itemTypeId },
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  // const SelectById = (id) => {
  //   return query.data?.find((chat) => chat._id === id);
  // };


  return {
    ...query, // This spreads in properties like data, isLoading, isError, etc.
  };
}
