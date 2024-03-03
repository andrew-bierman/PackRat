import { createParam } from '@packrat/crosspath';

const { useParam } = createParam();

export const useProfileId = () => {
  return useParam('id');
};
