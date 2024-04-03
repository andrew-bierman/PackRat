import { useRouter } from 'app/hooks/router';
import { queryTrpc } from 'app/trpc';

export const useDeletePack = (id) => {
  const { mutateAsync: deletePack } = queryTrpc.deletePack.useMutation();
  const router = useRouter();

  const handleDeletePack = async () => {
    try {
      await deletePack({ packId: id });

      router.replace({pathname:"/packs", query: { refresh: true} });

    } catch {}
  };

  return handleDeletePack;
};
