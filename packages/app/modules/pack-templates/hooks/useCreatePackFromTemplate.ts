import { queryTrpc } from 'app/trpc';

export const useCreatePackFromTemplate = () => {
  const mutation = queryTrpc.createPackFromTemplate.useMutation({
    onMutate: async () => {
      // TODO (current) implement optimistic pack creation
    },
    onError: () => {
      // TODO (current)
    },
    onSuccess: () => {
      // TODO (current)
    },
  });

  const createPackFromTemplate = (id: string) => {
    mutation.mutate({
      packId: id,
    });
  };

  const { isLoading, isFetching, ...rest } = mutation;

  return {
    createPackFromTemplate,
    isLoading: isLoading && isFetching,
    ...rest,
  };
};
