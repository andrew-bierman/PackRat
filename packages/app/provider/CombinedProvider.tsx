import React from 'react';
import { SessionProvider } from '../context/Auth/SessionProvider';
import { ThemeProvider } from '../context/theme';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { JotaiProvider } from './JotaiProvider';
import { useAttachListeners } from './useAttachListeners';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  useAttachListeners();

  return (
    <JotaiProvider>
      <TrpcTanstackProvider>
        <SessionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </TrpcTanstackProvider>
    </JotaiProvider>
  );
}
