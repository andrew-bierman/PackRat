import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';

export default function AppLayout() {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
