import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { setNetworkStatus } from 'app/store/offlineQueue';

export const useNetworkStatusProvider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      dispatch(setNetworkStatus(state.isConnected));
    });
  }, []);
};
