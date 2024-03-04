import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ token: string }>();

export const usePasswordResetToken = () => {
  return useParam('token');
};
