import { queryTrpc } from '../../trpc';

export const useAddNewTrip = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.addTrip.useMutation({
    onMutate: async (newTrip) => {
      utils.getTrips.cancel({
        owner_id: newTrip.owner_id,
      });
      // Step 1: Define optimistic update
      const optimisticUpdate = {
        ...newTrip,
        type:"trip",
         geojson:JSON.parse(newTrip.geoJSON),
        _id: Date.now(),
      };
      console.log('Optimistic update');
      console.log(newTrip.owner_id);

      const oldQueryData = utils.getTrips.getData({
        owner_id: newTrip.owner_id,
      });
      console.log("old data")
      console.log(oldQueryData)
      

      const newQueryData = [...oldQueryData,optimisticUpdate];
      utils.getTrips.setData(
        {
          owner_id: newTrip.owner_id,
        },
        (oldQueryData) => newQueryData,
      );
      return {
        oldQueryData,
      };
    },
    onError: (_error, _trip, context) => {
      console.log('error');
      console.log(context.oldQueryData);
      utils.getTrips.setData(
        {
            owner_id:  _trip.owner_id,
        },
        (oldQueryData) => context.oldQueryData,
      );
    },
    onSuccess: (result) => {
      console.log('Success:', result);
      utils.getTrips.invalidate()
    },
  });
  return {
    mutation,
    AddNewTrip: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
