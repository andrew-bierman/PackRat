import { usePublicFeed } from './publicFeed';
import { useUserPacks } from './../packs';
import { useUserTrips } from '../singletrips';

export const useFeed = (
  queryString = 'Most Recent',
  ownerId = null,
  feedType = 'public',
  selectedTypes = { pack: true, trip: true },
  pageNo,
) => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes, pageNo);
    case 'userPacks':
      return useUserPacks(ownerId, queryString);
    case 'userTrips':
      return useUserTrips(ownerId);
    default:
      return { data: null, error: null, isLoading: true };
  }
};
