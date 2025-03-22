import { queryTrpc } from 'app/trpc';

export const useSetItemQuantity = () => {
  const utils = queryTrpc.useUtils();

  const mutation = queryTrpc.setItemQuantity.useMutation();

  const setItemQuantity = ({
    itemId,
    packId,
    quantity,
  }: {
    itemId: string;
    packId: string;
    quantity: number;
  }) => {
    mutation.mutate(
      { itemId, packId, quantity },
      {
        onSuccess: () => {
          utils.getUserPacksFeed.invalidate();
        },
      },
    );
  };

  return { setItemQuantity, ...mutation };
};
