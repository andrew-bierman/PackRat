import { Storage } from 'app/utils/storage';
import { useUserSetter } from './useUserSetter';
import { queryTrpc } from 'app/trpc';

export const useLogout = () => {
  const setUser = useUserSetter();
  const utils = queryTrpc.useUtils();

  const logout = async () => {
    setUser(null);
    try {
      await utils.logout.fetch(await Storage.getItem('refreshToken'));
    } catch {
      // pass
    }
    await Storage.removeItem('token');
    await Storage.removeItem('refreshToken');
  };

  return logout;
};
