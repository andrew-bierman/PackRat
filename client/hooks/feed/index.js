import React from 'react';
import { queryTrpc } from '../../trpc';

export const useFeed = (queryString, ownerId, feedType, selectedTypes) => {
  let data = [];
  let isLoading = true;

  try {
    switch (feedType) {
      case 'public':
        const publicPacks = queryTrpc.getPublicPacks.useQuery(
          { queryBy: queryString ?? 'Favorite' },
          {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
          },
        );
        const publicTrips = queryTrpc.getPublicTripsRoute.useQuery(
          { queryBy: queryString ?? 'Favorite' },
          {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            enabled: publicPacks?.status === 'success',
          },
        );

        isLoading =
          publicPacks?.status !== 'success' &&
          publicTrips?.status !== 'success';

        if (selectedTypes.pack && publicPacks?.status === 'success')
          data = [
            ...data,
            ...publicPacks.data.map((item) => ({ ...item, type: 'pack' })),
          ];

        if (selectedTypes.trip && publicTrips?.status === 'success')
          data = [
            ...data,
            ...publicTrips.map((item) => ({ ...item, type: 'trip' })),
          ];

        break;

      case 'userPacks':
        if (!ownerId) break;

        const userPacks = queryTrpc.getPacks.useQuery(
          { ownerId, queryBy: queryString },
          {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
          },
        );

        isLoading = userPacks?.status !== 'success';

        if (userPacks?.status === 'success') data = userPacks.data.packs;

        break;

      case 'userTrips':
        if (!ownerId) break;

        const userTrips = queryTrpc.getTrips.useQuery(
          { owner_id: ownerId },
          {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
          },
        );

        isLoading = userTrips?.status !== 'success';

        if (userTrips?.status === 'success') data = userTrips.data;

        break;

      default:
        return { data: null, error: null, isLoading };
    }
  } catch (error) {
    console.error(error);
    return { data: null, error, isLoading };
  }

  return { data, error: null, isLoading };
};

export const useAddNewPack = () => {
  const mutation = queryTrpc.addPack.useMutation();
  return { mutation };
};
