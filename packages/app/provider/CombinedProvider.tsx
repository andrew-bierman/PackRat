'use client';
import React from 'react';
import { SessionProvider } from '../context/Auth/SessionProvider';
import { ThemeProvider } from '../context/theme';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import dynamic from 'next/dynamic';
import ReduxProvider from './ReduxProvider';

// const ReduxProvider = dynamic(() => import('./ReduxProvider'), {
//   ssr: false,
// });

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
