import { useNetworkStatusProvider } from 'app/hooks/offline';

export const NetworkStatusProvider = ({ children }) => {
  useNetworkStatusProvider();

  return children;
};
