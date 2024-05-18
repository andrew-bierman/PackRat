import { useState } from 'react';
import { queryTrpc } from '../../trpc';
import { useAuthUser } from 'app/auth/hooks';

export const useAddNewPack = () => {
  const user = useAuthUser();
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const utils = queryTrpc.useContext();

  const packSelectOptions = [
    { value: '1', label: 'Yes' },
    { value: '0', label: 'No' },
  ];

  // Use mutation for adding a pack
  const addNewPack = (data) => {
    mutation.mutate({
      name: data.name,
      is_public: data.isPublic === packSelectOptions[0].value,
      owner_id: user?.id,
    });
  };

  // TODO Refactor pack creation
  const addNewPackAsync = (data) => {
    return mutation.mutateAsync({
      name: data.name,
      is_public: data.isPublic === packSelectOptions[0].value,
      owner_id: user?.id,
    });
  };

  const mutation = queryTrpc.addPack.useMutation({
    onMutate: async (packData) => {
      utils.getPacks.cancel({
        ownerId: packData?.owner_id,
        queryBy: '',
      });
      // Step 1: Define optimistic update
      const optimisticUpdate = {
        ...packData,
        id: Date.now(),
      };

      const oldQueryData = utils.getPacks.getData({
        ownerId: packData?.owner_id,
        queryBy: '',
      });

      const newQueryData = {
        ...oldQueryData,
        packs:
          oldQueryData && oldQueryData.packs
            ? [...oldQueryData?.packs, optimisticUpdate]
            : [optimisticUpdate],
      };
      utils.getPacks.setData(
        {
          ownerId: packData.owner_id,
          queryBy: '',
        },
        (oldQueryData) => newQueryData,
      );
      setName('');
      setIsPublic(false);
      return {
        oldQueryData,
      };
    },
    onError: (_error, _pack, context) => {
      utils.getPacks.setData(
        {
          ownerId: _pack.owner_id,
          queryBy: '',
        },
        (oldQueryData) => context.oldQueryData,
      );
    },
    onSuccess: (result) => {
      utils.getPacks.invalidate();
    },
  });
  return {
    mutation,
    addNewPack,
    addNewPackAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    response: mutation.data,
    name,
    isPublic,
    setIsPublic,
    setName,
    packSelectOptions,
  };
};
