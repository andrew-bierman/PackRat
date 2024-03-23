import { useEffect } from 'react';
import { createParam } from '@packrat/crosspath';

const { useParam } = createParam<{ packId: string }>();
export const usePackIdQParam = () => {
  return useParam('packId');
};
