import { useRouter } from 'expo-router';
import { useCallback } from 'react';

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
