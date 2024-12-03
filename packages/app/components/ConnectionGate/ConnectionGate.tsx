import React, { type ReactNode, type FC } from 'react';
import { type ConnectionStatus, useOfflineStore } from 'app/atoms';

interface ConnectionGateProps {
  mode: ConnectionStatus;
  children: ReactNode;
}
export const ConnectionGate: FC<ConnectionGateProps> = ({ mode, children }) => {
  const { connectionStatus } = useOfflineStore();

  return connectionStatus === mode ? children : null;
};
