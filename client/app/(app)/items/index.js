import { Platform } from 'react-native';
import { Stack as Header } from 'expo-router';
import ItemsScreen from '../../../screens/items';

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
