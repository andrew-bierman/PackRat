import { queryTrpc } from 'app/trpc';

export const useCalculateStore = (packId, type) => {
  const utils = queryTrpc.useUtils();
  const { mutateAsync: calculatePackStore } = queryTrpc.scorePack.useMutation();

  const calculateScore = async () => {
    try {
      if (type === 'pack') {
        await calculatePackStore({ packId });
        utils.getPackById.invalidate();
      }
    } catch {
      console.error('Failed to calculate score');
    }
  };

  return calculateScore;
};
