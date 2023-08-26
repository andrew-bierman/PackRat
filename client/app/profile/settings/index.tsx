import { Platform, ScrollView } from 'react-native';
import { Stack as Header } from 'expo-router';
import Settings from '../../../screens/user/Settings';

export default function SettingsPage() {
  return (
    <ScrollView>
      {
        Platform.OS === 'web' ? (
          <>
            <Header.Screen
              options={{
                // https://reactnavigation.org/docs/headers#setting-the-header-title
                title: 'Settings',
                // http://reactnavigation.org/docs/headers#adjusting-header-styles

                // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
              }}
            />
            <Settings />
          </>
        ) : (
          <Settings />
        )
        // <ProfileContainerMobile />
      }
    </ScrollView>
  );
}
