import { Platform } from 'react-native';
import { RequestPasswordReset } from 'app/components/password-reset';
import { Stack } from 'expo-router';
import { PasswordResetForm } from 'app/components/password-reset/PasswordResetForm';
import Head from 'expo-router/head';

export default function ResetPasswordRoute() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Reset Password</title>
        </Head>
      )}
      <Stack.Screen
        name="Reset Password"
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Reset Password'
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <RequestPasswordReset />
      {/* <PasswordResetForm /> */}
    </>
  );
}
