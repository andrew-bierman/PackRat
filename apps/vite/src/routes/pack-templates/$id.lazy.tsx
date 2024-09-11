import { createLazyFileRoute } from '@tanstack/react-router';
import { AuthWrapper } from 'app/modules/auth';
import { PackDetailsScreen } from 'app/modules/pack';

export const Route = createLazyFileRoute('/pack-templates/$id')({
  component: PackTemplateScreen,
});

function PackTemplateScreen() {
  return (
    <AuthWrapper>
      <PackDetailsScreen />
    </AuthWrapper>
  );
}
