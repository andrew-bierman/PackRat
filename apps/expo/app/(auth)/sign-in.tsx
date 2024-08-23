import React from 'react';
import { LoginScreen } from 'app/modules/auth';
import { Stack } from 'expo-router';

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
      <LoginScreen />
    </>
  );
}
