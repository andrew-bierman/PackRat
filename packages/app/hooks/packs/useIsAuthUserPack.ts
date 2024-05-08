import { useAuthUser } from 'app/auth/hooks';

export const useIsAuthUserPack = (pack) => {
  const user = useAuthUser();

  return pack && user && pack.owner_id === user.id;
};
