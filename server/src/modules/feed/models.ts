export interface Modifiers {
  isPublic?: boolean;
  ownerId?: string;
  searchTerm?: string;
  includeUserFavoritesOnly?: boolean;
}

export type FeedQueryBy =
  | 'Favorite'
  | 'Most Recent'
  | 'Lightest'
  | 'Heaviest'
  | 'Oldest';
