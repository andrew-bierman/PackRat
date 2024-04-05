import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ id: string }>();
export const usePackId = () => {
  return useParam('id');
};
