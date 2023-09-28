import { Slot } from 'expo-router';

import { Platform, View } from 'react-native';

import Navigation from '../screens/Navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/store';

import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import FlashMessage from 'react-native-flash-message';
import Footer from '../components/footer/Footer';
import { TrpcQueryProvider } from '../context/tRPC';

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <TrpcQueryProvider>
            <ThemeProvider>
              <FlashMessage position="top" />
              <Navigation />
              <Slot />
              {/* {Platform.OS === 'web' ? <Footer /> : null} */}
            </ThemeProvider>
          </TrpcQueryProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
