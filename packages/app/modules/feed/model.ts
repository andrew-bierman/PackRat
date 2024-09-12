import { type CardType } from '@packrat/ui';

export type FeedType = 'pack';

export interface FeedItem {
  id: string;
  owner: {
    id: string;
    username: string;
  };
  name: string;
  similarityScore?: number;
  total_weight: number;
  total_score: number;
  is_public: boolean;
  favorited_by: Array<{
    id: string;
  }>;
  quantity?: number;
  userFavoritePacks?: string[];
  favorites_count: number;
  owner_id: string | { id: string };
  destination: string;
  createdAt: string;
  owners: Array<{ any: any }>;
  duration: string;
  type: FeedType;
  itemPacks?: any[];
}

export interface FeedCardProps<Details> {
  id: string;
  title: string;
  cardType: CardType;
  createdAt: string;
  details: Details;
  ownerId: string;
  favoriteCount: number;
  isUserFavorite: boolean;
  toggleFavorite: () => void;
}
