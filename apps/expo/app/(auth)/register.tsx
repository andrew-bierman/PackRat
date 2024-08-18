import React from 'react';
import { RegisterScreen } from 'app/modules/auth';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

/**
 * Renders the RegisterContainer component based on the platform.
 *
 * @return {ReactNode} The rendered RegisterContainer component.
 */
export default function RegisterContainer() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Register</title>
          <meta name="description" content="Register" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Register',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <RegisterScreen />
    </>
  );
}
