import { usePublicFeed } from './publicFeed';
import { useUserPacks } from './../packs';
import { useUserTrips } from './../trips';

export const useFeed = (
  queryString = 'Most Recent',
  ownerId = null,
  feedType = 'public',
  selectedTypes = { pack: true, trip: true },
) => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes);
    case 'userPacks':
      return useUserPacks(ownerId, queryString);
    case 'userTrips':
      return useUserTrips(ownerId);
    default:
      return { data: null, error: null, isLoading: true };
  }
};
