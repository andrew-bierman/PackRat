import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/feed/')({
  component: FeedNav,
});

export default function FeedNav() {
  return (
    <AuthWrapper>
      <Feed />
    </AuthWrapper>
  );
}
