import React from 'react';
import useTheme from 'app/hooks/useTheme';

import { FontAwesome5 } from '@expo/vector-icons';
import { FormSelect, RCard, RParagraph, RStack, Select } from '@packrat/ui';
enum TripActivity {
  TRIP = 'trip',
  RUNNING = 'running',
  BIKING = 'biking',
  CAMPING = 'camping',
  FISHING = 'fishing',
  TREKKING = 'trekking',
  ROCK_CLIMBING = 'rock-climbing',
  HIKING = 'hiking',
  SWIMMING = 'swimming',
}

import { TripCardBase } from './TripCardBase';
import { getEnumValues } from 'app/utils/getEnumValues';
import { formatTripActivityLabel } from 'app/utils/tripUtils';

const ActivityOptions = getEnumValues(TripActivity).map((activity) => ({
  label: formatTripActivityLabel(activity),
  value: activity,
}));

type TripActivityCardProps = {
  onChange: (activity: string) => void;
  selectedValue: string;
};

export const TripActivityCard = ({
  onChange,
  selectedValue,
}: TripActivityCardProps) => {
  const { currentTheme } = useTheme();

  return (
    <TripCardBase
      icon={() => (
        <FontAwesome5
          name="hiking"
          size={24}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      title="Activity"
    >
      <Select
        value={selectedValue}
        onValueChange={onChange}
        options={ActivityOptions}
        name="activity"
      />
    </TripCardBase>
  );
};
