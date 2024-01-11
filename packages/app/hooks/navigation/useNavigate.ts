import { useCallback } from 'react';
import { useRouter } from './useRouter';

export const useNavigate = () => {
  const router = useRouter();

  const navigate = useCallback(
    (href) => {
      setTimeout(() => {
        router.push(href);
      }, 0);
    },
    [router],
  );

  return navigate;
};
