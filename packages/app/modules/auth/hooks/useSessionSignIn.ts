import { useCallback } from 'react';
import { useUserSetter } from './useUserSetter';
import { Storage } from 'app/utils/storage';
import { useRouter } from 'app/hooks/router';

export const useSessionSignIn = () => {
  const setUser = useUserSetter();
  const router = useRouter();

  const sessionSignIn = useCallback((tokens) => {
    (async () => {
      await Storage.setItem('token', tokens.accessToken);
      await Storage.setItem('refreshToken', tokens.refreshToken);
      setUser(tokens.user);
      router.push('/');
    })();
  }, []);

  return sessionSignIn;
};
