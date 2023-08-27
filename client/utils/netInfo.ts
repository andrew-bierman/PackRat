import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnected: Promise<boolean> = NetInfo.fetch().then(
  (state) => state.isConnected,
);
