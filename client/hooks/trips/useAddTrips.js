import { queryTrpc } from "../../trpc";

export const useAddTrips = () => {
    const utils = queryTrpc.useUtils()
    const mutation = queryTrpc.addTrip.useMutation()

    const AddTrips = (newTrip) => {
        mutation.mutate(newTrip, {
          onSuccess: () => {
            utils.getTrips.invalidate()
          }
        });
    };

    return {
        AddTrips,
        ...mutation
    }
}