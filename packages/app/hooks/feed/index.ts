import { usePublicFeed } from './publicFeed';
import { useUserPacks } from './../packs';
import { useUserTrips } from '../singletrips';

export const useFeed = (
  queryString = 'Most Recent',
  ownerId: string | undefined = undefined,
  feedType = 'public',
  selectedTypes = { pack: true, trip: true },
) => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes);
    case 'userPacks':
      return useUserPacks(ownerId || undefined, queryString);
    case 'userTrips':
      return useUserTrips(ownerId || undefined);
    default:
      return { data: null, error: null, isLoading: true };
  }
};
