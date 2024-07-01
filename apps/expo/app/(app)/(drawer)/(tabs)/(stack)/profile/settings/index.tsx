import { Platform, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Settings from 'app/screens/user/Settings';
import Head from 'expo-router/head';

export default function SettingsPage() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Settings</title>
        </Head>
      )}
      <Stack.Screen
        name="Settings"
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Settings',
          // http://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Settings />
    </>
  );
}
