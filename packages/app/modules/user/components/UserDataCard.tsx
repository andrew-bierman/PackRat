import React, { type FC } from 'react';
import { type UserData, type UserDataResource } from './model';
import { UserDataPackCardConverter, UserDataTripCardConverter } from './utils';
import { type CardType } from '@packrat/ui';
import { useAddFavorite } from 'app/modules/feed';
import { useAuthUser } from 'app/modules/auth';
import { UserTripCard } from './UserTripCard';
import { UserPackCard } from './UserPackCard';
import { type FeedCardProps } from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import { type TripDetails } from 'app/modules/trip/model';
interface PackCardProps extends FeedCardProps<PackDetails> {}
interface TripCardProps extends FeedCardProps<TripDetails> {}

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
  isAuthUserProfile?: boolean;
  cardType: CardType;
  item: UserData;
}

export const UserDataCard: FC<UserDataCardProps> = ({
  item,
  cardType,
  feedType,
  isAuthUserProfile,
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

  if (feedType === 'trip') {
    return (
      <UserTripCard
        {...(cardProps as TripCardProps)}
        cardType={cardType}
        toggleFavorite={handleAddToFavorite}
        isAuthUserProfile={isAuthUserProfile}
      />
    );
  }

  if (feedType === 'pack') {
    return (
      <UserPackCard
        {...(cardProps as PackCardProps)}
        cardType={cardType}
        toggleFavorite={handleAddToFavorite}
        isAuthUserProfile={isAuthUserProfile}
      />
    );
  }

  return null;
};
