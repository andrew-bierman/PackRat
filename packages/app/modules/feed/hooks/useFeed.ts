import { usePublicFeed } from './usePublicFeed';
import { useUserPacks, useSimilarPacks } from 'app/modules/pack';
import { useUserTrips } from 'app/modules/trip';
import { useSimilarItems } from 'app/modules/item';

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
