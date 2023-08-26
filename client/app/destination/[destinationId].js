import { Platform } from 'react-native';
import { DestinationPage } from '../../components/destination';
// import DestinationPage from "../../components/destination";
import { Stack as Header } from 'expo-router';

export default function Destination() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Destination',
          name: 'Destination',
          options: { title: 'Destination' },
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      <DestinationPage />
    </>
  ) : (
    <DestinationPage />
  );
}
