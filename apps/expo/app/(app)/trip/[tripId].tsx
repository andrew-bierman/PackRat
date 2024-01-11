import PackContainer from 'app/components/pack/PackContainer';
import { TripDetails } from 'app/screens/trip/TripDetails';
import { DetailsComponent } from 'app/components/details';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Trip() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Trip</title>
          <meta name="description" content="Trip" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Trip',
          name: 'Trip',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <TripDetails />
    </>
  );
}
