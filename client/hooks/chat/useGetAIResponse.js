import { queryTrpc } from '../../trpc';

export function useGetAIResponse({ userId, conversationId, userInput }) {
  const query = queryTrpc.getAIResponse.useQuery(
    {
      userId,
      conversationId,
      userInput,
    },
    {
      enabled: !!userInput && !!conversationId && !!userId,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );

  return {
    ...query,
  };
}
