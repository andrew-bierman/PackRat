import { usePublicFeed } from './publicFeed';
import { useUserPacks } from './../packs';
import { useUserTrips } from '../singletrips';
import { useSimilarPacks } from 'app/hooks/packs';
import { useSimilarItems } from 'app/hooks/items';

export const useFeed = ({
  queryString = 'Most Recent',
  ownerId,
  feedType = 'public',
  selectedTypes = { pack: true, trip: true },
  id,
}: Partial<{
  queryString: string;
  ownerId: string;
  feedType: string;
  selectedTypes: Object;
  id: string;
}> = {}) => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes);
    case 'userPacks':
      return useUserPacks(ownerId || undefined, queryString);
    case 'userTrips':
      return useUserTrips(ownerId || undefined);
    case 'similarPacks':
      return useSimilarPacks(id);
    case 'similarItems':
      return useSimilarItems(id);
    default:
      return { data: null, error: null, isLoading: true };
  }
};
