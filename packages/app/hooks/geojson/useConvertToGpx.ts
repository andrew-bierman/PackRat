import { queryTrpc } from '../../trpc';

export const convertGeoJSONToGPX = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.postSingleGeoJSON.useMutation();

  const GeoJSONToGPX = (geoJSON) => {
    mutation.mutate(geoJSON, {
      onSuccess: () => {
        utils.getTrailsOSM.invalidate();
        utils.getParksOSM.invalidate();
      },
    });
  };

  return {
    GeoJSONToGPX,
    ...mutation,
  };
};
