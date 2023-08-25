import PackContainer from '../../components/pack/PackContainer';
import { PackDetails } from '../../components/pack/PackDetails';
import { DetailsComponent } from '../../components/details';
import { Platform } from 'react-native';
import { Stack as Header } from 'expo-router';

export default function Pack() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Pack',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      {/* <DetailsComponent type='pack'/> */}
      <PackDetails />
    </>
  ) : (
    <PackDetails />
  );
}
