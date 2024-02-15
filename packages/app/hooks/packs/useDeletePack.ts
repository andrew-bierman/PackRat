import { useRouter } from '@packrat/ui';
import { queryTrpc } from 'app/trpc';

export const useDeletePack = (id) => {
  const { mutateAsync: deletePack } = queryTrpc.deletePack.useMutation();
  const router = useRouter();

  const handleDeletePack = async () => {
    try {
      await deletePack(id);
      router.replace('/packs');
    } catch {}
  };

  return handleDeletePack;
};
