'use client';
import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store/store';

export default function ReduxProvider({ children }) {
  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxStoreProvider>
  );
}

// TODO: add back once next js is working properly
