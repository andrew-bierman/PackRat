import { queryTrpc } from 'app/trpc';

// TODO implement optimistic pack creation
export const useCreatePackFromTemplate = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.createPackFromTemplate.useMutation({
    onSuccess: () => {
      utils.getPacks.invalidate();
    },
  });

  const createPackFromTemplate = (id: string) => {
    mutation.mutate({
      id,
    });
  };

  const { isLoading, ...rest } = mutation;

  return {
    createPackFromTemplate,
    isLoading,
    ...rest,
  };
};
