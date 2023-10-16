import { queryTrpc } from '../../trpc';


export const useAddTrips = () => {

const utils=queryTrpc.useContext()
  const mutation = queryTrpc.addTrip.useMutation(
    {
      onMutate:async (newTrip) => {
        utils.getTrips.cancel({
          ownerId:newTrip.owner_id,
        })
        // Step 1: Define optimistic update
        const optimisticUpdate = {
          ...newTrip,
          _id: Date.now(),
        };
        console.log("Optimistic update")
        console.log(newTrip)
        
        const oldQueryData= utils.getTrips.getData({
          ownerId:newTrip.owner_id,
        })
        
        const newQueryData = {
          ...oldQueryData,
            optimisticUpdate
        };
        console.log( newQueryData )
        utils.getTrips.setData({
          ownerId:newTrip.owner_id,
        },oldQueryData=>newQueryData)
        return {
          oldQueryData
        }

      },
      onError:(_error,_pack,context)=>{
        console.log("error")
        console.log(context.oldQueryData)
        utils.getTrips.setData({
          ownerId:_pack.owner_id,
        },oldQueryData=>context.oldQueryData)
      },
      onSuccess: (result) => {
        console.log("Success:", result);
        utils.getTrips.invalidate()
      },
    }
  );
  return {
    mutation, 
    addNewTrip:mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error
  };
};
