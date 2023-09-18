import { AuthProvider } from 'context/auth';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  <AuthProvider>
    <Stack />
  </AuthProvider>;
}
