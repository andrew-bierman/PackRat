import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'auth/authWrapper';

// export const runtime = 'experimental-edge'

export default function FeedNav() {
  return (
    <>
      <Feed feedType="userTrips" />
    </>
  );
}

FeedNav.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
