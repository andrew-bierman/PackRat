import {
  type FeedCardProps,
  type FeedItem,
  type TripFeedItem,
  type PackFeedItem,
} from '../../model';
import { formatDistanceToNowStrict } from 'date-fns';
import { type PackDetails } from 'app/modules/pack';
import { truncateString } from 'app/utils/truncateString';
import { type TripDetails } from '../../../trip/model';
import { roundNumber } from 'app/utils';
import { type RouterOutput } from 'app/trpc';

type Converter<Input, Result> = (
  input: Input,
  currentUserId?: string | number,
) => Result | null;

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
    is_public: input.is_public ?? false,
    title: truncateString(input.name, 25),
    ownerId:
      typeof input.owner_id === 'string'
        ? input.owner_id
        : input.owner_id?.id || '',
    details: {
      score: !isNaN(input.total_score) ? roundNumber(input.total_score) : 0,
      similarityScore:
        typeof input.similarityScore === 'number' &&
        !isNaN(input.similarityScore)
          ? roundNumber(input.similarityScore)
          : 0,
      weight: input.total_weight,
      quantity: input.quantity ?? 0,
    },
    isUserFavorite: input?.userFavoritePacks?.some?.(
      (userId) => userId === currentUserId,
    ),
    favoriteCount: input.favorites_count ?? 0,
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
    is_public: input.is_public ?? false,
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
      score: !isNaN(input.total_score) ? roundNumber(input.total_score) : 0,
    },
    favoriteCount: input.favorites_count ?? 0,
  };
};

export const feedItemCardConverter: Converter<
  FeedItem,
  RouterOutput['getPackTemplates']['data'][number]
> = (input) => {
  if (input.type === 'pack') {
    const packInput = input as PackFeedItem;
    return {
      id: packInput.id,
      name: packInput.name,
      description: '',
      type: packInput.type,
      quantity: packInput.quantity,
      total_weight: packInput.total_weight,
    };
  } else if (input.type === 'trip') {
    const tripInput = input as TripFeedItem;
    return {
      id: tripInput.id,
      name: tripInput.name,
      description: tripInput.description,
      type: tripInput.type,
      quantity: 0,
      total_weight: 0,
    };
  }
  return null;
};

export const feedItemPackTemplateCardConverter: Converter<
  FeedItem,
  RouterOutput['getPackTemplates']['data'][number]
> = (input) => {
  if (input.type === 'pack') {
    const packInput = input as PackFeedItem;
    return {
      id: packInput.id,
      name: packInput.name,
      description: '',
      type: packInput.type,
      quantity: packInput.quantity,
      total_weight: packInput.total_weight,
    };
  } else if (input.type === 'trip') {
    const tripInput = input as TripFeedItem;
    return {
      id: tripInput.id,
      name: tripInput.name,
      description: tripInput.description,
      type: tripInput.type,
      quantity: 0,
      total_weight: 0,
    };
  }
  return null;
};
