import { Slot } from 'expo-router';

import { Platform, View } from 'react-native';

import Navigation from '../screens/Navigation';

import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { Provider } from '../provider';
import Footer from '../components/footer/Footer';

export default function HomeLayout() {
  return (
    <Provider>
      {Platform.OS === 'web' ? <Navigation /> : null}
      <Slot />
      {/* {Platform.OS === 'web' ? <Footer /> : null} */}
    </Provider>
  );
}
