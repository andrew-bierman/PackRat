import { Slot, SplashScreen } from 'expo-router';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { AuthProvider } from '../context/auth';
import { ThemeProvider } from '../context/theme';
import Footer from '../components/footer/Footer';
import { NetworkStatusProvider } from '../context/NetworkStatusProvider';
import Header from '../screens/header';

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <NetworkStatusProvider>
            <ThemeProvider>
              <Header />
              <Slot />
              {Platform.OS === 'web' ? <Footer /> : null}
            </ThemeProvider>
          </NetworkStatusProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
