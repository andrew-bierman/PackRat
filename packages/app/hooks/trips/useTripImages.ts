import { queryTrpc } from '../../trpc';

export const useTripImages = () => {
  const utils = queryTrpc.useUtils();
  const { mutate: addTripImageMutation } = queryTrpc.addTripImage.useMutation();

  const addTripImage = (tripId: string, image: string) => {
    addTripImageMutation(
      { tripId, image },
      {
        onSuccess: () => {
          utils.getTrips.invalidate();
        },
      },
    );
  };

  return {
    addTripImage,
  };
};
