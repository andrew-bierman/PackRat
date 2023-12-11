import SandCastlePackrat from '../../../screens/sand-castle';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function AboutRoute() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Packrat Sandcastle</title>
          <meta name="description" content="SandCastle" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'SandCastle',
          name: 'SandCastle',
          statusBarHidden: true
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <SandCastlePackrat />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
