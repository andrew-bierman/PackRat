import { createLazyFileRoute } from '@tanstack/react-router';
import { AuthWrapper } from 'app/modules/auth';
import { PackTemplateDetailsScreen } from 'app/modules/pack-templates';

export const Route = createLazyFileRoute('/pack-templates/$id')({
  component: PackTemplateScreen,
});

function PackTemplateScreen() {
  return (
    <AuthWrapper>
      <PackTemplateDetailsScreen />
    </AuthWrapper>
  );
}
