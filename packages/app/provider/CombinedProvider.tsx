import React from 'react';
import { SessionProvider } from '../context/Auth/SessionProvider';
import { ThemeProvider } from '../context/theme';
import { BugsnagErrorBoundary } from './BugsnagProvider';
import { JotaiProvider } from './JotaiProvider';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { useAttachListeners } from './useAttachListeners';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  useAttachListeners();

  return (
    <BugsnagErrorBoundary>
      <JotaiProvider>
        <TrpcTanstackProvider>
          <SessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </TrpcTanstackProvider>
      </JotaiProvider>
    </BugsnagErrorBoundary>
  );
}
