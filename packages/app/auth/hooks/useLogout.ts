import { Storage } from 'app/utils/storage';
import { useUserSetter } from './useUserSetter';

export const useLogout = () => {
  const setUser = useUserSetter();

  const logout = () => {
    setUser(null);
    Storage.removeItem('token');
  };

  return logout;
};
