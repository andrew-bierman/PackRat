import ProfileContainer from '../../../screens/user/ProfileContainer';
import { Platform, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Profile() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Profile</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Profile',
          // http://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <ProfileContainer />
    </>
  );
}
