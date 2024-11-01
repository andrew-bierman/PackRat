import React, { type FC } from 'react';
import { type FeedItem, type FeedResource } from 'app/modules/feed/model';
import {
  feedItemPackCardConverter,
  feedItemTripCardConverter,
  feedItemPackTemplateCardConverter,
  feedItemCardConverter,
} from './utils';
import { PackCard } from 'app/modules/pack';
import { type CardType } from '@packrat/ui';
import { useAddFavorite } from 'app/modules/feed';
import { useAuthUser } from 'app/modules/auth';
import { TripCard } from 'app/modules/trip';
import { PackTemplateCard } from 'app/modules/pack-templates';
import { ItemCard } from 'app/modules/item';

const convertersByType = {
  pack: feedItemPackCardConverter,
  trip: feedItemTripCardConverter,
  item: feedItemCardConverter,
  packTemplate: feedItemPackTemplateCardConverter,
};

const cardComponentsByType: Record<FeedResource, React.FC<any>> = {
  pack: PackCard,
  trip: TripCard,
  item: ItemCard,
  packTemplate: PackTemplateCard,
};

interface FeedCardProps {
  feedType: FeedResource;
  cardType: CardType;
  item: FeedItem;
}

export const FeedCard: FC<FeedCardProps> = ({ item, cardType, feedType }) => {
  const { addFavorite } = useAddFavorite();
  const user = useAuthUser();
  const cardProps =
    typeof convertersByType[feedType] === 'function'
      ? convertersByType[feedType](item, user?.id)
      : null;
  const handleAddToFavorite = () => {
    if (!user) return;
    const data = {
      packId: item.id,
      userId: user.id,
    };

    addFavorite(data);
  };

  if (!cardProps) {
    return null;
  }

  const CardComponent = cardComponentsByType[feedType];

  return (
    <CardComponent
      {...cardProps}
      cardType={cardType}
      toggleFavorite={handleAddToFavorite}
    />
  );
};
