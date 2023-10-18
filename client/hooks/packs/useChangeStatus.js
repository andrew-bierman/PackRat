import { queryTrpc } from '../../trpc';

export const useChangePackItem = () => {
  const utils = queryTrpc.useContext();

  const mutation = queryTrpc.editPack.useMutation({
    onMutate: async (editedPack) => {
        console.log(editedPack.owner_id)
      const previousPack = utils.getPacks.getData({
        ownerId: editedPack.owner_id,
      });
      console.log(previousPack);
      const packIndex = previousPack.packs.findIndex(
        (pack) => pack._id === editedPack._id,
      );

      if (packIndex=== -1) {
        throw new Error('Item not found in the pack.');
      }
      const newQueryData = {
        ...previousPack,
        packs: previousPack.packs.map((pack, index) => {
          if (index === packIndex) {
            // Update the edited item properties
            return {
              ...pack,
              ...editedPack,
            };
          }
          return pack;
        }),
      };
 
      utils.getPacks.setData( {
        ownerId: editedPack.owner_id
      }, newQueryData);

      return {
        previousPack,
      };
    },
    onError: (err, editedItem, context) => {
      console.log('Error');
      console.log(err);
      console.log( editedItem)

      if (context.previousPack) {
        // Restore the previous pack data in case of an error
        utils.getPacks.setData(
          { ownerId: editedItem.owner_id },
          context.previousPack,
        );
      }
    },
    onSuccess: (result) => {
        console.group("success")
      utils.getPacks.invalidate({
        ownerId:result.owner_id 

      });
    },
  });

  // Return the mutate function and other relevant properties
  return {
    mutation,
    changeStatusPackItem: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};