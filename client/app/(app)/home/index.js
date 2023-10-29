import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import Dashboard from '../../../screens/dashboard';

/**
 * Renders the HomePage component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function HomePage() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Home</title>
          <meta name="description" content="Home" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Home',
          name: 'Home',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Dashboard />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
