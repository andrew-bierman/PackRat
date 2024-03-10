import ProfileContainer from 'app/screens/user/ProfileContainer';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/')({
  component: Profile,
});

export default function Profile() {
  return (
    <AuthWrapper>
      <ProfileContainer />
    </AuthWrapper>
  );
}
