import NetInfo from '@react-native-community/netinfo';
import { useOfflineStore } from '../../atoms';
import { useEffect } from 'react';

export const useNetworkStatusProvider = () => {
  const { setIsConnected } = useOfflineStore();

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      // Check if state.isConnected is not null before using it
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });
  }, []);
};
