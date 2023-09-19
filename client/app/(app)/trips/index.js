import CreateTrip from '../../../screens/trip/createTrip';

import { Platform, Text } from 'react-native';
import { Stack as Header } from 'expo-router';
export default function Trip() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Create Trip',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <CreateTrip />
    </>
  ) : (
    <CreateTrip />
  );
}
