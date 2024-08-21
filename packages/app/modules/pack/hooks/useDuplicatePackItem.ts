import { queryTrpc } from 'app/trpc';

export const useDuplicatePackItem = () => {
  const { mutateAsync } = queryTrpc.duplicatePublicPack.useMutation();

  const duplicatePackItem = (data) => {
    (async () => {
      try {
        await mutateAsync(data);
      } catch {
        console.error('Failed to duplicate item');
      }
    })();
  };

  return duplicatePackItem;
};
