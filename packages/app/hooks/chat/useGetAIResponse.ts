import { queryTrpc } from '../../trpc';

export function useGetAIResponse() {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.getAIResponse.useMutation({
    // onMutate: async ({ userId, conversationId, userInput }) => {
    //   const previousConversation = queryTrpc.getConversationById.getData({
    //     conversationId,
    //   });
    //   const newQueryData = {
    //     ...previousConversation,
    //     messages: [
    //       ...previousConversation.messages,
    //       {
    //         message: userInput,
    //         sender: userId,
    //         id: Date.now().toString(),
    //       },
    //     ],
    //   };
    //   queryTrpc.getConversationById.setData(
    //     { conversationId },
    //     newQueryData,
    //   );
    //   return {
    //     previousConversation,
    //   };
    // },
    // onError: (err, { userId, conversationId, userInput }, context) => {
    //   console.log('Error');
    //   console.log(err);
    //   if (context.previousConversation) {
    //     queryTrpc.getConversationById.setData(
    //       { conversationId },
    //       context.previousConversation,
    //     );
    //   }
    // },
    onSuccess: () => {
      //   queryTrpc.getUserChats.invalidate();
      utils.invalidate();
    },
  });

  const getAIResponse = async ({ userId, userInput, itemTypeId }) => {
    return mutation.mutate({
      userId,
      userInput: userInput.message,
      itemTypeId,
    });
  };

  return {
    getAIResponse,
    ...mutation,
  };
}
