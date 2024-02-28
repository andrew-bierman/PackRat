import ProfileContainer from 'app/screens/user/ProfileContainer';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

export default function Profile() {
  return <ProfileContainer />;
}

Profile.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
