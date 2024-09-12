export interface Modifiers {
  isPublic?: boolean;
  ownerId?: string;
  searchTerm?: string;
}

export type FeedQueryBy =
  | 'Favorite'
  | 'Most Recent'
  | 'Lightest'
  | 'Heaviest'
  | 'Oldest';
