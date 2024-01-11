import React from 'react';
import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { ReduxProvider } from './ReduxProvider';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <TrpcTanstackProvider>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </TrpcTanstackProvider>
    </ReduxProvider>
  );
}
