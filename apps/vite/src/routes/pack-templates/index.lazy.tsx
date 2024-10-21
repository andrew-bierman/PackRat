import { FeedScreen } from 'app/modules/feed';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/pack-templates/')({
  component: PackTemplatesScreen,
});

function PackTemplatesScreen() {
  return (
    <AuthWrapper>
      <FeedScreen feedType="packTemplates" />
    </AuthWrapper>
  );
}

export default PackTemplatesScreen;
