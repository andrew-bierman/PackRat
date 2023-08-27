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
import { useEffect } from 'react';
import { setNetworkStatus } from '../store/offlineQueue';
import { checkNetworkConnected } from '~/utils/netInfo';

export default function HomeLayout() {
  useEffect(() => {
    checkNetworkConnected.then((res) => {
      console.log('line 23 ', res);
      store.dispatch(setNetworkStatus(res));
    });
  }, []);
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
