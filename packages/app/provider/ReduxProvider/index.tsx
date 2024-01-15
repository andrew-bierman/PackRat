import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store/store';

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxStoreProvider>
  );
};
