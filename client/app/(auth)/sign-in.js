import Login from '../../screens/LoginScreen';
import { Platform } from 'react-native';
import { Stack as Header } from 'expo-router';

/**
 * Renders the SignIn component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function SignIn() {
  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Login',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Login />
    </>
  ) : (
    <Login />
  );
}
