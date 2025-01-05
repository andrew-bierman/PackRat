import { usePublicFeed } from './usePublicFeed';
import { useUserPacks, useSimilarPacks } from 'app/modules/pack';
import { useUserTrips } from 'app/modules/trip';
import { useSimilarItems } from 'app/modules/item';
import { usePackTemplates } from 'app/modules/pack-templates';
import { type FeedType } from '../model';
import { type PaginationReturn } from 'app/hooks/pagination';

interface UseFeedResult extends Partial<PaginationReturn> {
  data: any[] | null;
  isLoading: boolean;
  isError?: boolean;
  refetch?: () => void;
  setPage?: (page: number) => void;
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
  feedType: FeedType;
  selectedTypes: Object;
  searchQuery?: string;
  id: string;
}> = {}): UseFeedResult => {
  const publicFeed = usePublicFeed(
    queryString,
    searchQuery ?? '',
    selectedTypes,
    feedType === 'public',
  );
  const userPacks = useUserPacks(
    ownerId || '',
    { searchTerm: searchQuery ?? '' },
    queryString,
    feedType === 'userPacks',
  );
  const userTrips = useUserTrips(
    ownerId || '',
    { searchTerm: searchQuery ?? '' },
    feedType === 'userTrips',
  );
  const similarPacks = useSimilarPacks(id || '', feedType === 'similarPacks');
  const similarItems = useSimilarItems(id || '', feedType === 'similarItems');
  const packTemplates = usePackTemplates(
    { searchQuery, orderBy: queryString },
    feedType === 'packTemplates',
  );

  switch (feedType) {
    case 'public':
      return publicFeed;
    case 'userPacks':
      return userPacks;
    case 'userTrips':
      return userTrips;
    case 'similarPacks':
      return similarPacks as unknown as UseFeedResult;
    case 'similarItems':
      return similarItems as unknown as UseFeedResult;
    case 'packTemplates':
      return packTemplates as unknown as UseFeedResult;
    default:
      return { data: null, isLoading: true };
  }
};
