import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { useOfflineStore } from '../../atoms';
import { useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';

export const useNetworkStatusProvider = () => {
  const { setConnectionStatus } = useOfflineStore();

  useEffect(() => {
    const setNetworkStatus = (state: NetInfoState) => {
      if (state.isConnected !== null) {
        const connectionStatus = state.isConnected ? 'connected' : 'offline';
        onlineManager.setOnline(connectionStatus === 'connected');
        setConnectionStatus(connectionStatus);
      }
    };
    NetInfo.fetch().then(setNetworkStatus);
    NetInfo.addEventListener(setNetworkStatus);
  }, []);
};
