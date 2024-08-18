import { useAuthUser } from 'app/modules/auth';

export const useIsAuthUserPack = (pack) => {
  const user = useAuthUser();

  return pack && user && pack.owner_id === user.id;
};
