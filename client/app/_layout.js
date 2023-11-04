import { Slot } from 'expo-router';

import { Platform, View } from 'react-native';

import Navigation from '../screens/Navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import '@tamagui/core/reset.css';

import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { store, persistor } from '../store/store';

import { SessionProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import FlashMessage from 'react-native-flash-message';
import Footer from '../components/footer/Footer';

export default function HomeLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider>
            <ThemeProvider>
              <FlashMessage position="top" />
              {Platform.OS === 'web' && <Navigation />}
              <Slot />
              {/* {Platform.OS === 'web' ? <Footer /> : null} */}
            </ThemeProvider>
          </SessionProvider>
        </PersistGate>
      </Provider>
    </TamaguiProvider>
  );
}
