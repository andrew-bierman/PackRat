import React from 'react';
import { Provider } from 'app/provider';
import { Stack } from 'expo-router';
import Bugsnag from '../Bugsnag';

const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React);

export default function HomeLayout() {
  return (
    <ErrorBoundary>
      <Provider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Provider>
    </ErrorBoundary>
  );
}
