import React, { type ReactNode, type FC } from 'react';
import { RText, XStack, YStack } from '@packrat/ui';

interface DestinationDetailProps {
  icon: ReactNode;
  label: string;
  value: string | null;
}

export const DestinationDetail: FC<DestinationDetailProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <XStack space="$3" style={{ minWidth: 140, alignItems: 'center' }}>
      {icon}
      <YStack>
        <RText style={{ fontSize: 14, lineHeight: 16 }}>{label}</RText>
        <RText style={{ fontSize: 16, fontWeight: 500, lineHeight: 24 }}>
          {value || 'N / A'}
        </RText>
      </YStack>
    </XStack>
  );
};
