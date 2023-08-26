import PackContainer from '../../components/pack/PackContainer';
import { TripDetails } from '../../screens/trip/TripDetails';
import { DetailsComponent } from '../../components/details';
import { Platform } from 'react-native';
import { Stack as Header } from 'expo-router';

export default function Trip() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Trip',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      {/* <DetailsComponent type='pack'/> */}
      <TripDetails />
    </>
  ) : (
    <></>
  );
}
