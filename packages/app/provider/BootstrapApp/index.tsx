import React from 'react';
import { useAttachListeners } from '../useAttachListeners';
import { useOfflineMaps } from 'app/modules/map/hooks/useOfflineMaps';
import { Platform } from 'react-native';

export function BootstrapApp({ children }: { children: React.ReactNode }) {
  useAttachListeners();
  // Prefetch Offline maps for offline mode
  useOfflineMaps({ enabled: Platform.OS !== 'web' });

  return <>{children}</>;
}
