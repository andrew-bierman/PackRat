import ProfileContainer from 'app/screens/user/ProfileContainer';
import { AuthWrapper } from 'auth/authWrapper';

// export const runtime = 'experimental-edge'

export default function Profile() {
  return <ProfileContainer id={undefined}/>;
}

Profile.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
