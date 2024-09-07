import { type FeedCardProps, type FeedItem } from 'modules/feed/model';
import { formatDistanceToNowStrict } from 'date-fns';
import { type PackDetails } from 'app/modules/pack';
import { truncateString } from 'app/utils/truncateString';

type Converter<Input, Result> = (
  input: Input,
  currentUserId?: string | number,
) => Result;

export const feedItemPackCardConverter: Converter<
  FeedItem,
  Omit<FeedCardProps<PackDetails>, 'cardType' | 'toggleFavorite'>
> = (input, currentUserId) => {
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
      score: input.total_score,
      weight: input.total_weight,
      quantity:
        input?.itemPacks?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue?.item?.quantity,
          0,
        ) ?? 0,
    },
    isUserFavorite: input?.userFavoritePacks?.some(
      (obj) => obj?.userId === currentUserId,
    ),
    favoriteCount: input.favorites_count,
  };
};
