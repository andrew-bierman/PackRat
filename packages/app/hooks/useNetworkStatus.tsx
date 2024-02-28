import { useContext } from 'react';

export function useNetworkStatusProvider() {
  return useContext(NetworkStatusContext);
}
