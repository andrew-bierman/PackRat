import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ id: string }>();

export const useProfileId = () => {
  return useParam('id');
};
