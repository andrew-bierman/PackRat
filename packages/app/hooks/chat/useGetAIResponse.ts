import { queryTrpc } from '../../trpc';

export function useGetAIResponse() {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.getAIResponse.useMutation({
    onSuccess: () => {
      utils.invalidate();
    },
  });

  const getAIResponse = async ({ userId, userInput, itemTypeId, type }) => {
    return mutation.mutate({
      userId,
      userInput: userInput.message,
      itemTypeId,
      type,
    });
  };

  return {
    getAIResponse,
    ...mutation,
  };
}

export function useGetAISuggestions() {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.getAISuggestions.useMutation({
    onSuccess: () => {
      utils.invalidate();
    },
  });

  const getAISuggestions = async ({ userId, itemTypeId, type }) => {
    return mutation.mutate({
      userId,
      itemTypeId,
      type,
    });
  };

  return {
    getAISuggestions,
    ...mutation,
  };
}
