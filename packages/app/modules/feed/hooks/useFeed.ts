import { usePublicFeed } from './usePublicFeed';
import { useUserPacks, useSimilarPacks } from 'app/modules/pack';
import { useUserTrips } from 'app/modules/trip';
import { useSimilarItems } from 'app/modules/item';

interface UseFeedResult {
  data: any[] | null;
  isLoading: boolean;
  refetch?: () => void;
  setPage?: (page: number) => void;
  nextPage?: number | boolean;
  fetchNextPage?: () => void;
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
  searchQuery?: string;
  id: string;
}> = {}): UseFeedResult => {
  const publicFeed = usePublicFeed(
    queryString,
    searchQuery,
    selectedTypes,
    feedType === 'public',
  );
  const userPacks = useUserPacks(
    ownerId || undefined,
    { searchTerm: searchQuery },
    queryString,
    feedType === 'userPacks',
  );
  const userTrips = useUserTrips(
    ownerId || undefined,
    feedType === 'userTrips',
  );
  const similarPacks = useSimilarPacks(id, feedType === 'similarPacks');
  const similarItems = useSimilarItems(id, feedType === 'similarItems');

  switch (feedType) {
    case 'public':
      return publicFeed;
    case 'userPacks':
      return userPacks;
    case 'userTrips':
      return userTrips;
    case 'similarPacks':
      return similarPacks;
    case 'similarItems':
      return similarItems;
    default:
      return { data: null, isLoading: true };
  }
};
