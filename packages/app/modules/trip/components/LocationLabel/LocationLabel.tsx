import { XStack, RText } from '@packrat/ui';
import { MapPin } from '@tamagui/lucide-icons';
import React, { type FC } from 'react';

interface CreatedAtLabelProps {
  location: string;
}
export const LocationLabel: FC<CreatedAtLabelProps> = ({ location }) => {
  return (
    <XStack
      style={{ marginTop: 4, alignItems: 'center', maxWidth: '100%' }}
      space={4}
    >
      <MapPin size={16} />
      <RText>{location}</RText>
    </XStack>
  );
};
