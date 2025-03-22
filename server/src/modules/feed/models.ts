export interface Modifiers {
  isPublic?: boolean;
  ownerId?: string;
  searchTerm?: string;
  itemId?: string;
  includeUserFavoritesOnly?: boolean;
}

export type FeedQueryBy =
  | 'Favorite'
  | 'Most Recent'
  | 'Lightest'
  | 'Heaviest'
  | 'Oldest';

export interface PaginationParams {
  limit: number;
  offset: number;
}
