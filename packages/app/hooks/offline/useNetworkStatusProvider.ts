import NetInfo from '@react-native-community/netinfo';
import { useOfflineStore } from 'app/global-state/';
import { useEffect } from 'react';

export const useNetworkStatusProvider = () => {
  const { setIsConnected } = useOfflineStore();

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
  }, []);
};
