import { type CardType } from '@packrat/ui';

export type FeedType =
  | 'public'
  | 'userPacks'
  | 'userTrips'
  | 'similarPacks'
  | 'similarItems';
export type FeedResource = 'pack' | 'trip';

export interface BaseFeedItem {
  id: string;
  type: FeedResource;
  name: string;
  owner: {
    id: string;
    username: string;
  };
  is_public: boolean;
  favorited_by: Array<{
    id: string;
  }>;
  favorites_count: number;
  owner_id: string | { id: string };
  createdAt: string;
  owners: Array<{ any: any }>;
}

interface PackFeedItem extends BaseFeedItem {
  type: 'pack';
  total_weight: number;
  total_score: number;
  userFavoritePacks?: Array<{ userId: string }>;
  itemPacks?: any[];
}

export interface TripFeedItem extends BaseFeedItem {
  type: 'trip';
  description: string;
  destination: string;
  duration: string;
  start_date: string;
  end_date: string;
}

export type FeedItem = PackFeedItem | TripFeedItem;
export interface FeedCardProps<Details> {
  id: string;
  title: string;
  cardType: CardType;
  createdAt: string;
  details: Details;
  ownerId: string;
  favoriteCount: number;
  isUserFavorite?: boolean;
  toggleFavorite?: () => void;
}
