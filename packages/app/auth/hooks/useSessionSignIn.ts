import { useCallback } from 'react';
import { useUserSetter } from './useUserSetter';
import { Storage } from 'app/utils/storage';
import { useRouter } from 'app/hooks/router';

export const useSessionSignIn = () => {
  const setUser = useUserSetter();
  const router = useRouter();

  const sessionSignIn = useCallback((user) => {
    if (user?.token) {
      Storage.setItem('session', user);
      Storage.setItem('token', user.token);
      setUser(user);
      router.push('/');
    }
  }, []);

  return sessionSignIn;
};
