import { type CardType } from '@packrat/ui';

export type UserDataType =
  | 'public'
  | 'userPacks'
  | 'userTrips'
  | 'similarPacks'
  | 'similarItems';
export type UserDataResource = 'pack' | 'trip';

export interface BaseFeedItem {
  id: string;
  type: UserDataResource;
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
  similarityScore?: number;
  quantity?: number;
  total_weight: number;
  total_score: number;
  userFavoritePacks?: string[] | Array<{ userId: string }>;
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
}

export type UserData = PackFeedItem | TripFeedItem;
export interface UserDataCardProps<Details> {
  id: string;
  title: string;
  cardType: CardType;
  createdAt: string;
  details: Details;
  ownerId: string;
  favoriteCount: number;
  isUserFavorite?: boolean;
  isPublic?: boolean;
  isAuthUserProfile?: boolean;
  toggleFavorite?: () => void;
}
