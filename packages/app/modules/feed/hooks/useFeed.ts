import { usePublicFeed } from './usePublicFeed';
import { useUserPacks, useSimilarPacks } from 'app/modules/pack';
import { useUserTrips } from 'app/modules/trip';
import { useSimilarItems } from 'app/modules/item';

interface UseFeedResult {
  data: any[] | null;
  isLoading: boolean;
  refetch?: () => void;
  setPage?: (page: number) => void;
  hasMore?: boolean;
  fetchNextPage?: (isInitialFetch?: boolean) => Promise<void>;
}

export const useFeed = ({
  queryString = 'Most Recent',
  ownerId,
  feedType = 'public',
  selectedTypes = { pack: true, trip: true },
  id,
  searchQuery,
}: Partial<{
  queryString: string;
  ownerId: string;
  feedType: string;
  selectedTypes: Object;
  id: string;
  searchQuery: string;
}> = {}): UseFeedResult => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes, searchQuery); 
    case 'userPacks':
      return useUserPacks(ownerId || undefined, queryString);
    case 'userTrips':
      return useUserTrips(ownerId || undefined);
    case 'similarPacks':
      return useSimilarPacks(id);
    case 'similarItems':
      return useSimilarItems(id);
    default:
      return { data: null, isLoading: true };
  }
};
