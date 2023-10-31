import About from '../../../screens/about';
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
          <title>About</title>
          <meta name="description" content="About" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'About',
          name: 'About',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <About />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
