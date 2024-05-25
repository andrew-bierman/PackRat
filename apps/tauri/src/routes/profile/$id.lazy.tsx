import ProfileContainer from 'app/screens/user/ProfileContainer';
import { useProfileId } from 'app/hooks/user';

import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/$id')({
  component: Profile,
});

export default function Profile() {
  const [id] = useProfileId();

  return (
    <>
      <ProfileContainer id={id} />
    </>
  );
}
