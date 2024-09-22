import React from 'react';
import { RText, View } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const StatusLabel = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <MaterialCommunityIcons name="check-circle" size={20} color="green" />
      <RText>Offline</RText>
    </View>
  );
};
