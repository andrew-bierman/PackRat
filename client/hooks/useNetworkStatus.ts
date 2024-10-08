import { useContext } from 'react';

export function useNetworkStatus() {
  return useContext(NetworkStatusContext);
}
