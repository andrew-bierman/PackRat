import { useState } from 'react';
import { queryTrpc } from '../../trpc';
import { useAuthUser } from 'app/auth/hooks';

interface Pack {
  id: number;
  name: string;
  is_public: boolean;
  owner_id: string;
}

interface PacksData {
  packs: Pack[];
  message?: string;
}

interface GetDataParams {
  ownerId: string;
  queryBy: string;
}

interface SetDataParams {
  ownerId: string;
  queryBy: string;
}

type DataUpdateFunction<TData> = (prevData?: TData) => TData;

interface UseAddNewPackResult {
  mutation: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: any; // Adjust the type as needed
    data: any; // Adjust the type as needed
    mutate: (data: Pack) => void;
    mutateAsync: (data: Pack) => Promise<any>;
  };
  addNewPack: (data: { name: string; isPublic: boolean }) => void;
  addNewPackAsync: (data: { name: string; isPublic: boolean }) => Promise<any>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: any; // Adjust the type as needed
  response: any; // Adjust the type as needed
  name: string;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  setName: (value: string) => void;
  packSelectOptions: { value: string; label: string }[];
}

export const useAddNewPack = (): UseAddNewPackResult  => {
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
      if (!packData) {
        throw new Error('Pack data is not available.');
      }

      // Step 1: Define optimistic update
      const optimisticUpdate = {
        ...packData,
        id: Date.now(),
      };

      // Get current query data
      const oldQueryData = utils.getPacks.getData({
        ownerId: packData?.owner_id,
        queryBy: '',
      });

      // Prepare updated query data
      const newQueryData = {
        ...oldQueryData,
        packs:
          oldQueryData && oldQueryData.packs
            ? [...oldQueryData?.packs, optimisticUpdate]
            : [optimisticUpdate],
      };

      // Update query data
      utils.getPacks.setData(
        {
          ownerId: packData.owner_id,
          queryBy: '',
        },
        () => newQueryData,
      );

      setName('');
      setIsPublic(false);

      return { oldQueryData };
    },
    onError: (_error, _pack, context) => {
      if (!context) {
        throw new Error('Context is not available.');
      }

      if (!_pack) {
        throw new Error('Pack data is not available.');
      }

      // Restore old query data on error
      utils.getPacks.setData(
        {
          ownerId: _pack.owner_id,
          queryBy: '',
        },
        // Ensure the callback returns the correct structure
        () => context.oldQueryData,
      );
    },
    onSuccess: (result) => {
      // Invalidate the query on success
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
