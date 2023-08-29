import { Slot } from 'expo-router';

import { Platform, View } from 'react-native';

import Navigation from '../screens/Navigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/store';

import { AuthProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import Footer from '../components/footer/Footer';
import { useEffect } from 'react';
import { setNetworkStatus } from '../store/offlineQueue';
import { checkNetworkConnected } from '~/utils/netInfo';
import { NativeBaseProvider } from 'native-base';

import Header from '../screens/header';

export default function HomeLayout() {
  // TODO - move this to a separate provider + redux store
  useEffect(() => {
    checkNetworkConnected.then((res) => {
      // console.log('line 23 ', res);
      store.dispatch(setNetworkStatus(res));
    });
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <ThemeProvider>
              <Header />
              <Slot />
              {Platform.OS === 'web' ? <Footer /> : null}
            </ThemeProvider>
          </AuthProvider>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
}
