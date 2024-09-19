import { queryTrpc } from 'app/trpc';

// TODO implement optimistic pack creation
export const useCreatePackFromTemplate = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.createPackFromTemplate.useMutation({
    onSuccess: () => {
      utils.getPacks.invalidate();
    },
  });

  const createPackFromTemplate = (
    packTemplateId: string,
    newPackName: string,
  ) => {
    mutation.mutate({
      packTemplateId,
      newPackName,
    });
  };

  const { isLoading, ...rest } = mutation;

  return {
    createPackFromTemplate,
    isLoading,
    ...rest,
  };
};
