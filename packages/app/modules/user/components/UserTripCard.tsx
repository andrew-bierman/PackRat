import { Card, RButton, RStack } from '@packrat/ui';
import React, { useState, type FC } from 'react';
import { TripImage } from 'app/modules/trip/components/TripCard/TripImage';
import { LocationLabel } from 'app/modules/trip/components/LocationLabel/LocationLabel';
import useTheme from 'app/hooks/useTheme';
import { type TripDetails } from 'app/modules/trip/model';
import { useSetTripVisibility } from 'app/hooks/trips/useSetTripVisibility';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { type UserDataCardProps } from './model';

interface TripCardProps extends UserDataCardProps<TripDetails> {}

export const UserTripCard: FC<TripCardProps> = (props) => {
  const { setTripVisibility, isLoading, isError } = useSetTripVisibility();
  const updateIsPublic = (value) => {
    setTripVisibility({ tripId: props.id, is_public: value });
  };
  const isPublic = props?.isPublic;
  const { currentTheme } = useTheme();

  return (
    <Card
      title={props.title}
      link={`/trip/${props.id}`}
      image={<TripImage />}
      subtitle={<LocationLabel location={props.details.destination} />}
      actions={
        <RStack style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
          {props.isAuthUserProfile && (
            <RButton
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                padding: 0,
                opacity: isLoading ? 0.4 : 1,
              }}
              disabled={isLoading}
              unstyled
              onPress={() => updateIsPublic(!isPublic)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {isPublic ? (
                <Eye style={{ pointerEvents: 'none' }} />
              ) : (
                <EyeOff style={{ pointerEvents: 'none' }} />
              )}
            </RButton>
          )}
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
