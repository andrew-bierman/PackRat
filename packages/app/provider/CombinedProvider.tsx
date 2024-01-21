import React from 'react';
import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { ReduxProvider } from './ReduxProvider';
import { NetworkStatusProvider } from './NetworkStatusProvider';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <TrpcTanstackProvider>
        <SessionProvider>
          <ThemeProvider>
            <NetworkStatusProvider>{children}</NetworkStatusProvider>
          </ThemeProvider>
        </SessionProvider>
      </TrpcTanstackProvider>
    </ReduxProvider>
  );
}
