import React from 'react';
import Login from 'app/screens/LoginScreen';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

/**
 * Renders the SignIn component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function SignIn() {
  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Login',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Login />
    </>
  );
}
