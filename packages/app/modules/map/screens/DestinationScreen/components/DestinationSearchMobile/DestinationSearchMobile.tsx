import React from 'react';
import useTheme from 'app/hooks/useTheme';
import { RButton, RText as OriginalRText } from '@packrat/ui';
import { useRouter } from 'app/hooks/router';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const RText: any = OriginalRText;

export const DestinationSearchMobile = () => {
  const { currentTheme } = useTheme();
  const router = useRouter();

  return (
    <RButton
      style={{
        backgroundColor: currentTheme.colors.card,
        minWidth: '100%',
        height: 40,
        flexDirection: 'row',
      }}
      onPress={() => {
        router.push('/search');
      }}
    >
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        color={currentTheme.colors.text}
      />
      <RText color={currentTheme.colors.text} opacity={0.6}>
        Search by park, city, or trail
      </RText>
    </RButton>
  );
};
