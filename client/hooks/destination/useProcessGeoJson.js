import { queryTrpc } from "../../trpc";

export const useProcessGeoJSON = (data) => {
    const utils = queryTrpc.useUtils()
    mutation = queryTrpc.postSingleGeoJSON.useMutation()

    const ProcessGeoJSON = (data) => {
        mutation.mutate({ geojson:data }, {
          onSuccess: () => {
            utils.getDestination.invalidate()
          }
        });
    };

    return {
        ProcessGeoJSON,
        ...mutation
    }
}