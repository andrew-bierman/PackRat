import {
  Card,
  Details,
  RButton,
  RLink,
  RStack,
  RSwitch,
  RText,
  YStack,
} from '@packrat/ui';
import React, { useState, type FC } from 'react';
import { TripImage } from 'app/modules/trip/components/TripCard/TripImage';
import {
  CreatedAtLabel,
  FavoriteButton,
  type FeedCardProps,
} from 'app/modules/feed';
import { DuplicateIcon } from 'app/assets/icons';
import { type TripDetails } from 'modules/trip/model';
import { LocationLabel } from 'app/modules/trip/components/LocationLabel/LocationLabel';
import useTheme from 'app/hooks/useTheme';
import { useEditTrips } from 'app/hooks/trips';

interface TripCardProps extends FeedCardProps<TripDetails> {}

export const UserTripCard: FC<TripCardProps> = (props) => {
  const { editTrips, isLoading, isError } = useEditTrips();
  const [isPublic, setIsPublic] = useState(props.is_public);
  const updateIsPublic = (value) => {
    setIsPublic(value);
    editTrips({ id: props.id, name: props.title, is_public: value });
  };
  const { currentTheme } = useTheme();

  return (
    <Card
      title={props.title}
      link={`/trip/${props.id}`}
      image={<TripImage />}
      subtitle={<LocationLabel location={props.details.destination} />}
      actions={
        <RStack style={{ flexDirection: 'row', gap: 12 }}>
          {/* <FavoriteButton
            count={props.favoriteCount}
            isAuthUserFavorite={props.isUserFavorite}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.toggleFavorite();
            }}
          /> */}
          <RButton
            style={{
              backgroundColor: currentTheme.colors.background,
              borderRadius: 20,
              height: 20,
              width: 30,
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <RSwitch
              checked={isPublic}
              onCheckedChange={updateIsPublic}
              size="$1.5"
            />
          </RButton>
        </RStack>
      }
      type={props.cardType}
    />
  );
};
