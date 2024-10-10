import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ id: string }>();
export const usePackTemplateId = () => {
  return useParam('id');
};
