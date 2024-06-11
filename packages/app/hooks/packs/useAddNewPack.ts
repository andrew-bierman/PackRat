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

  const isPublicOption = packSelectOptions[0];
  if (!isPublicOption) {
    throw new Error('No select options available.');
  }

  if (!user || !user.id) {
    throw new Error('User not authenticated.');
  }
  // Use mutation for adding a pack
  const addNewPack = (data) => {
    mutation.mutate({
      name: data.name,
      is_public: data.isPublic === isPublicOption.value,
      owner_id: user?.id,
    });
  };

  // TODO Refactor pack creation
  const addNewPackAsync = (data) => {
    return mutation.mutateAsync({
      name: data.name,
      is_public: data.isPublic === isPublicOption.value,
      owner_id: user?.id,
    });
  };

  const mutation = queryTrpc.addPack.useMutation({
    onMutate: async (packData) => {
      // Check if packData is not void
      if (!packData) {
        throw new Error('Pack data is not available.');
      }

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
      // Check if context is not undefined
      if (!context) {
        throw new Error('Context is not available.');
      }

      // Check if packData is not void
      if (!_pack) {
        throw new Error('Pack data is not available.');
      }

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
