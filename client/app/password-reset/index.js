import { Platform } from 'react-native';
import {
  RequestPasswordReset,
  ResetPassword,
} from '../../components/password-reset';
import { Stack as Header } from 'expo-router';
import { PasswordResetForm } from '../../components/password-reset/PasswordResetForm';

export default function ResetPasswordRoute() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Reset Password',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <RequestPasswordReset />
      {/* <PasswordResetForm /> */}
    </>
  ) : (
    <ResetPassword />
  );
}
