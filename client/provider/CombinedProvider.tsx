// src/provider/CombinedProvider.tsx

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import { store, persistor } from '../store/store';

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
