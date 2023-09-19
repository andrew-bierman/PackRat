import { AuthProvider } from '../../context/auth';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
