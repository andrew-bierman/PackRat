import { useCallback } from 'react';
import { useUserSetter } from './useUserSetter';
import { Storage } from 'app/utils/storage';
import { useRouter } from 'app/hooks/router';

export const useSessionSignIn = () => {
  const setUser = useUserSetter();
  const router = useRouter();

  const sessionSignIn = useCallback((user) => {
    if (user?.token) {
      (async () => {
        setUser(user);
        await Storage.setItem('token', user.token);
        router.push('/');
      })();
    }
  }, []);

  return sessionSignIn;
};
