import { Slot } from 'expo-router';

import { Platform, View } from 'react-native';

import Navigation from '../screens/Navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/store';

import { AuthProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import FlashMessage from 'react-native-flash-message';
import Footer from '../components/footer/Footer';
import { NativeBaseProvider } from 'native-base';

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <ThemeProvider>
              <FlashMessage position="top" />
              <Navigation />
              <Slot />
              {Platform.OS === 'web' ? <Footer /> : null}
            </ThemeProvider>
          </AuthProvider>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
}
