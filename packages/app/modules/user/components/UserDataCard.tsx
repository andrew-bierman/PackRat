import React, { type FC } from 'react';
import { type UserData, type UserDataResource } from './model';
import { UserDataPackCardConverter, UserDataTripCardConverter } from './utils';
import { type CardType } from '@packrat/ui';
import { useAddFavorite } from 'app/modules/feed';
import { useAuthUser } from 'app/modules/auth';
import { UserTripCard } from './UserTripCard';
import { UserPackCard } from './UserPackCard';
import { View, Text } from 'react-native';

const convertersByType = {
  pack: UserDataPackCardConverter,
  trip: UserDataTripCardConverter,
};

const cardComponentsByType = {
  pack: UserPackCard,
  trip: UserTripCard,
};

interface UserDataCardProps {
  feedType: UserDataResource;
  cardType: CardType;
  item: UserData;
}

export const UserDataCard: FC<UserDataCardProps> = ({
  item,
  cardType,
  feedType,
}) => {
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
