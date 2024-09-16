import { type FeedCardProps, type FeedItem } from 'modules/feed/model';
import { formatDistanceToNowStrict } from 'date-fns';
import { type PackDetails } from 'app/modules/pack';
import { truncateString } from 'app/utils/truncateString';
import { type TripDetails } from 'modules/trip/model';
import { roundNumber } from 'app/utils';

type Converter<Input, Result> = (
  input: Input,
  currentUserId?: string | number,
) => Result;

export const feedItemPackCardConverter: Converter<
  FeedItem,
  Omit<FeedCardProps<PackDetails>, 'cardType' | 'toggleFavorite'>
> = (input, currentUserId) => {
  if (input.type !== 'pack') {
    console.error('Expected input to be of type pack');
    return null;
  }
  return {
    id: input.id,
    createdAt: formatDistanceToNowStrict(new Date(input.createdAt), {
      addSuffix: false,
    }),
    title: truncateString(input.name, 25),
    ownerId:
      typeof input.owner_id === 'string'
        ? input.owner_id
        : input.owner_id?.id || '',
    details: {
      score: !isNaN(input.total_score) ? roundNumber(input.total_score) : 0,
      similarityScore: !isNaN(input.similarityScore)
        ? roundNumber(input.similarityScore)
        : undefined,
      weight: input.total_weight,
      quantity: input.quantity,
    },
    isUserFavorite: input?.userFavoritePacks?.some?.(
      (userId) => userId === currentUserId,
    ),
    favoriteCount: input.favorites_count,
  };
};

export const feedItemTripCardConverter: Converter<
  FeedItem,
  Omit<FeedCardProps<TripDetails>, 'cardType' | 'toggleFavorite'>
> = (input, currentUserId) => {
  if (input.type !== 'trip') {
    console.error('Expected input to be of type trip');
    return null;
  }
  return {
    id: input.id,
    createdAt: formatDistanceToNowStrict(new Date(input.createdAt), {
      addSuffix: false,
    }),
    title: truncateString(input.name, 25),
    ownerId:
      typeof input.owner_id === 'string'
        ? input.owner_id
        : input.owner_id?.id || '',
    details: {
      destination: input.destination,
      description: truncateString(input.description, 100),
      startDate: input.start_date,
      endDate: input.end_date,
      activity: input.activity,
    },
    favoriteCount: input.favorites_count,
  };
};
