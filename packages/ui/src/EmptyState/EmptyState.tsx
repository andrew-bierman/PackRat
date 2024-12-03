import React, { type ReactNode, type FC } from 'react';
import { RText } from '@packrat/ui';
import { Stack } from 'tamagui';

interface EmptyStateProps {
  icon: ReactNode;
  text: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ text, icon }) => {
  return (
    <Stack style={{ alignItems: 'center', maxWidth: 250, gap: 8 }}>
      {icon}
      <RText style={{ fontSize: 16, textAlign: 'center' }}>{text}</RText>
    </Stack>
  );
};
