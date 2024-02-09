import { Redirect, Stack } from 'expo-router';
import { AuthLoader } from 'app/auth/AuthLoader';
import { Text } from '@packrat/ui';
import { Navigation } from 'app/components/navigation';

export default function DrawerLayout() {
  return <Navigation />;
}
