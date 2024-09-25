import { Card, RButton, RStack, RSwitch } from '@packrat/ui';
import React, { useState, type FC } from 'react';
import { TripImage } from 'app/modules/trip/components/TripCard/TripImage';
import { type FeedCardProps } from 'app/modules/feed';
import { LocationLabel } from 'app/modules/trip/components/LocationLabel/LocationLabel';
import useTheme from 'app/hooks/useTheme';
import { type TripDetails } from 'modules/trip/model';
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
      style={{
        borderColor: isPublic
          ? currentTheme.colors.secondaryBlue
          : currentTheme.colors.background,
        borderWidth: 2,
      }}
    />
  );
};
