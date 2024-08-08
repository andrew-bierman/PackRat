import React from 'react';
import { SessionProvider } from '../context/Auth/SessionProvider';
import { ThemeProvider } from '../context/theme';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { JotaiProvider } from './JotaiProvider';
import { useAttachListeners } from './useAttachListeners';
import Bugsnag from './Bugsnag';

const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React);

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  useAttachListeners();

  return (
    <ErrorBoundary>
      <JotaiProvider>
        <TrpcTanstackProvider>
          <SessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </TrpcTanstackProvider>
      </JotaiProvider>
    </ErrorBoundary>
  );
}
