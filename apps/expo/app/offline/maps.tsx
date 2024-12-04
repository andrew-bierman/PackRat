import React from 'react';
import { Stack } from 'expo-router';
import { OfflineMapsScreen } from 'app/modules/map/screens/OfflineMapsScreen';
import { EmptyState } from '@packrat/ui';
import { MapPin } from '@tamagui/lucide-icons';
import { OfflineMessage } from 'app/components/OfflineMessage';

export default function OfflineMaps() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Map',
        }}
      />
      <OfflineMessage />
      <OfflineMapsScreen
        fallback={
          <EmptyState
            icon={<MapPin size={32} />}
            text="No maps available. Connect to the network to add maps."
          />
        }
      />
    </>
  );
}
