import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnected: Promise<boolean> = NetInfo.fetch().then(
  (state) => {
    if (state.isConnected === null) {
      throw new Error('Network state is unknown');
    }
    return state.isConnected;
  },
);
