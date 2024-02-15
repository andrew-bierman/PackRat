import { useCallback } from 'react';
import { useRouter } from '@packrat/ui';

export const useTab = () => {
  const router = useRouter();

  const tab = useCallback(
    (href) => {
      setTimeout(() => {
        router.push(href);
      }, 0);
    },
    [router],
  );

  return tab;
};
