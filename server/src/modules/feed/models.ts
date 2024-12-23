export interface Modifiers {
  isPublic?: boolean;
  ownerId: string;
  authenticatedUserId: string;
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
