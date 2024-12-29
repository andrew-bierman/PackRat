import React from 'react';
import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { getEnumValues } from 'app/utils/getEnumValues';
import { formatTripActivityLabel } from 'app/utils/tripUtils';

import { FontAwesome5 } from '@expo/vector-icons';
import { Select as OriginalSelect } from '@packrat/ui';

const Select: any = OriginalSelect;

interface TripActivityCardProps {
  onChange: (activity: string) => void;
  selectedValue: string;
}

export const TripActivityCard = ({
  onChange,
  selectedValue,
}: TripActivityCardProps) => {
  const { currentTheme } = useTheme();

  return (
    <Select
      value={selectedValue}
      onValueChange={onChange}
      options={ActivityOptions}
      name="activity"
    />
  );
};
