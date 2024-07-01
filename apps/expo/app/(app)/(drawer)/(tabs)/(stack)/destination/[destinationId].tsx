import { Platform } from 'react-native';
import { DestinationPage } from 'app/components/destination';
// import DestinationPage from "../../components/destination";
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Destination() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Destination</title>
        </Head>
      )}
      <Stack.Screen
        name="Destination"
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Destination'
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <DestinationPage />
    </>
  );
}
