import ItemsScreen from '../../screens/items';

import { Platform } from 'react-native';
import { DestinationPage } from '../../components/destination';
// import DestinationPage from "../../components/destination";
import { Stack as Header } from 'expo-router';

export default function Items() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Items',
          name: 'Items',
          options: { title: 'Items' },
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      <ItemsScreen />
    </>
  ) : (
    <ItemsScreen />
  );
}
