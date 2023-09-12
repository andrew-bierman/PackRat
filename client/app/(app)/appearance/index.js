import { Platform } from 'react-native';
import { Stack as Header } from 'expo-router';
import AppearanceContainer from '../../../screens/appearance/AppearanceContainer';

export default function Appearance() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Appearance',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      <AppearanceContainer />
    </>
  ) : (
    <AppearanceContainer />

    // <ProfileContainerMobile />
  );
}
