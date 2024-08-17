import { FeedScreen } from 'app/modules/feed';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge';

export default function FeedNav() {
  return (
    <>
      <FeedScreen />
    </>
  );
}

FeedNav.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
