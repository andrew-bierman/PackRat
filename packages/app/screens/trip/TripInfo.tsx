import React from 'react';
import { RText, View, XStack, YStack } from '@packrat/ui';
import { LayoutCard } from 'app/components/LayoutCard';
import { FontAwesome5 } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';

export const TripInfo = ({ tripInfo }: { tripInfo: any }) => {
  const { currentTheme } = useTheme();

  return (
    <LayoutCard
      title={tripInfo.name}
      style={{ flex: 1, alignSelf: 'flex-start', width: '100%' }}
    >
      <YStack gap={8} style={{ width: '100%', maxWidth: 600 }}>
        <RText>{tripInfo.description}</RText>
        <XStack gap={8}>
          <FontAwesome5
            name="hiking"
            size={20}
            color={currentTheme.colors.text}
          />
          <RText>Activity:</RText>
          <RText style={{ paddingLeft: 8 }}>{tripInfo.activity}</RText>
        </XStack>
      </YStack>
    </LayoutCard>
  );
};
