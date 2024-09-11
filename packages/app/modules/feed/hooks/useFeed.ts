import { usePublicFeed } from './usePublicFeed';
import { useUserPacks, useSimilarPacks } from 'app/modules/pack';
import { useUserTrips } from 'app/modules/trip';
import { useSimilarItems } from 'app/modules/item';
import { usePackTemplates } from 'app/modules/pack-templates';

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
}: Partial<{
  queryString: string;
  ownerId: string;
  feedType: string;
  selectedTypes: Object;
  id: string;
}> = {}): UseFeedResult => {
  switch (feedType) {
    case 'public':
      return usePublicFeed(queryString, selectedTypes); // Use the typed return from usePublicFeed
    case 'userPacks':
      return useUserPacks(ownerId || undefined, queryString);
    case 'userTrips':
      return useUserTrips(ownerId || undefined);
    case 'similarPacks':
      return useSimilarPacks(id);
    case 'similarItems':
      return useSimilarItems(id);
    case 'packTemplates':
      return usePackTemplates();
    default:
      return { data: null, isLoading: true };
  }
};