import { Slot } from 'expo-router';
import { AuthWrapper } from 'app/auth/AuthWrapper';

export default function AppLayout() {
  return (
    <AuthWrapper>
      <Slot />
    </AuthWrapper>
  );
}
