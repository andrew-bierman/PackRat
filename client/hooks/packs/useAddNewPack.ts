import { useState } from 'react';
import { queryTrpc } from '../../trpc';
import { useSelector } from 'react-redux';

export const useAddNewPack = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const utils = queryTrpc.useContext();
  // Use mutation for adding a pack

    const addNewPack = () => { 
      mutation.mutate({
        name: name,
        is_public: isPublic,
        owner_id: user?._id,
      });
     }
 
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
      console.log(context.oldQueryData);
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
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    response: mutation.data,
    name,
    isPublic,
    setIsPublic,
    setName
  };
};
