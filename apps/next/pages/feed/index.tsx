import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'pages/authWrapper';

export default function FeedNav() {
  return (
    <>
      <Feed />
    </>
  );
}

FeedNav.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};