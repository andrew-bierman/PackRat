import { XStack, RText } from '@packrat/ui';
import { Clock } from '@tamagui/lucide-icons';
import React, { type FC } from 'react';

interface CreatedAtLabelProps {
  date: string;
}
export const CreatedAtLabel: FC<CreatedAtLabelProps> = ({ date }) => {
  return (
    <XStack
      style={{ marginTop: 4, alignItems: 'center', maxWidth: '100%' }}
      space={4}
    >
      <Clock size={16} />
      <RText>{date}</RText>
    </XStack>
  );
};
