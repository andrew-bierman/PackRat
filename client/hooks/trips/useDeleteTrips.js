import { queryTrpc } from "../../trpc";

export const useDeleteTrips = () => {
    const utils = queryTrpc.useUtils()
    const mutation = queryTrpc.deleteTrip.useMutation()

    const deleteTrips = (tripId) => {
        mutation.mutate(tripId, {
          onSuccess: () => {
            utils.getTrips.invalidate()
          }
        });
    };

    return {
        deleteTrips,
        ...mutation
    }
}