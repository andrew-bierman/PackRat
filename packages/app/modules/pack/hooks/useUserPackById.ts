import { useAuthUser } from 'app/modules/auth';
import { useUserPacks } from './useUserPacks';
import { usePackId } from './usePackId';

export const useUserPackById = () => {
  const authUser = useAuthUser();
  const [packId] = usePackId();
  const { data: packs } = useUserPacks(authUser?.id);

  return packs.find(({ id }) => id === packId);
};
