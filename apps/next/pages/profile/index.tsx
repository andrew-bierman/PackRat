import ProfileContainer from 'app/screens/user/ProfileContainer';
import { AuthWrapper } from 'auth/authWrapper';

export default function Profile() {
  return <ProfileContainer />;
}

Profile.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
