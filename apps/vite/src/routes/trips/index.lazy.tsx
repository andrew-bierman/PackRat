import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/trips/')({
  component: FeedNav,
});

export default function FeedNav() {
  return (
    <AuthWrapper>
      <Feed feedType="userTrips" />
    </AuthWrapper>
  );
}
