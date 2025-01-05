import { type CardType } from '@packrat/ui';

export type FeedType =
  | 'public'
  | 'userPacks'
  | 'userTrips'
  | 'similarPacks'
  | 'similarItems'
  | 'packTemplates';
export type FeedResource = 'pack' | 'item' | 'trip' | 'packTemplate';

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
  ga;
}

export interface PackFeedItem extends BaseFeedItem {
  type: 'pack';
  similarityScore?: number;
  quantity?: number;
  total_weight: number;
  total_score: number;
  userFavoritePacks?: string[];
  itemPacks?: any[];
}

export interface TripFeedItem extends BaseFeedItem {
  type: 'trip';
  description: string;
  destination: string;
  duration: string;
  start_date: string;
  end_date: string;
  activity: string;
  scores: { totalScore: number };
  total_score: number;
}

export type FeedItem = PackFeedItem | TripFeedItem;
export interface FeedCardProps<Details> {
  id: string;
  title: string;
  is_public: boolean;
  cardType: CardType;
  createdAt: string;
  details: Details;
  ownerId: string;
  favoriteCount: number;
  isUserFavorite?: boolean;
  toggleFavorite?: () => void;
}
