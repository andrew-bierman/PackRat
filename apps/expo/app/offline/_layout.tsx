import React from 'react';
import { OfflineTabs } from 'app/components/navigation/OfflineTabs';
import { useUserInOfflineMode } from 'app/modules/auth';
import { Redirect } from 'expo-router';
import { SafeArea } from 'app/provider/safe-area';

export default function OfflineLayout() {
  const { isLoading } = useUserInOfflineMode();
  if (isLoading) {
    return null;
  }

  return (
    <SafeArea>
      <OfflineTabs />
    </SafeArea>
  );
}
