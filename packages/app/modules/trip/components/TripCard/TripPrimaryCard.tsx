import { Card, Details, RLink, RStack, RText, YStack } from '@packrat/ui';
import React, { type FC } from 'react';
import { TripImage } from './TripImage';
import { CreatedAtLabel, type FeedCardProps } from 'app/modules/feed';
import { DuplicateIcon } from 'app/assets/icons';
import { type TripDetails } from 'modules/trip/model';
import { LocationLabel } from '../LocationLabel';

interface TripCardProps extends FeedCardProps<TripDetails> {}

export const TripPrimaryCard: FC<TripCardProps> = (props) => {
  const tripDetails = Object.entries(props.details)
    .filter(([key]) => key !== 'description')
    .map(([key, value]) => ({
      key,
      label: key,
      value,
    }));

  return (
    <Card
      title={props.title}
      link={`/trip/${props.id}`}
      image={<TripImage />}
      subtitle={<LocationLabel location={props.details.destination} />}
      actions={
        <RStack style={{ flexDirection: 'row', gap: 12 }}>
          <RStack alignItems="center" style={{ flexDirection: 'row', gap: 8 }}>
            <DuplicateIcon link={`/pack/${props.id}?copy=true`} />
          </RStack>
          <RLink
            href={`/profile/${props.ownerId}`}
            style={{ textDecoration: 'none' }}
          >
            <RText style={{ marginLeft: 'auto' }}>View owner</RText>
          </RLink>
        </RStack>
      }
      content={
        <YStack>
          <RText>{props.details.description}</RText>
          <Details
            items={[
              {
                key: 'startDate',
                label: 'Start Date',
                value: props.details.startDate,
              },
              {
                key: 'endDate',
                label: 'End Date',
                value: props.details.endDate,
              },
              {
                key: 'activity',
                label: 'Activity',
                value: props.details.activity,
              },
            ]}
          />
        </YStack>
      }
      type={props.cardType}
    />
  );
};
