import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/feed/')({
  component: FeedNav,
});

export default function FeedNav() {
  return (
    <AuthWrapper>
      <Feed />
    </AuthWrapper>
  );
}
