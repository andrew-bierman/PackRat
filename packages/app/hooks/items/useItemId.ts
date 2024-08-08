import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ itemId: string }>();
export const useItemId = () => {
  return useParam('itemId');
};
