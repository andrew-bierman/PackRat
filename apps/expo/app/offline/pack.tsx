import React from 'react';
import { Stack } from 'expo-router';
import { FeedScreen } from 'app/modules/feed';
import { OfflineMessage } from 'app/components/OfflineMessage';

export default function OfflineMaps() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Packs',
          headerShown: false,
        }}
      />
      <OfflineMessage />
      <FeedScreen feedType="userPacks" listStyle={{ paddingTop: 50 }} />
    </>
  );
}
