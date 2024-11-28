import React from 'react';
import { SessionProvider } from '../context/Auth/SessionProvider';
import { ThemeProvider } from '../context/theme';
import { BugsnagErrorBoundary } from './BugsnagProvider';
import { JotaiProvider } from './JotaiProvider';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { NetworkStatusProvider } from './NetworkStatusProvider';
import { BootstrapApp } from './BootstrapApp';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  return (
    <BugsnagErrorBoundary>
      <JotaiProvider>
        <NetworkStatusProvider>
          <TrpcTanstackProvider>
            <SessionProvider>
              <BootstrapApp>
                <ThemeProvider>{children}</ThemeProvider>
              </BootstrapApp>
            </SessionProvider>
          </TrpcTanstackProvider>
        </NetworkStatusProvider>
      </JotaiProvider>
    </BugsnagErrorBoundary>
  );
}
