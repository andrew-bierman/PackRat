import { Slot } from 'expo-router';

import { Platform, View } from 'react-native';

import { Navigation } from 'app/components/navigation';

import { Provider } from 'app/provider';
import Footer from 'app/components/footer/Footer';

export default function HomeLayout() {
  return (
    <Provider>
      <Navigation />
      <Slot />
      {/* {Platform.OS === 'web' ? <Footer /> : null} */}
    </Provider>
  );
}
