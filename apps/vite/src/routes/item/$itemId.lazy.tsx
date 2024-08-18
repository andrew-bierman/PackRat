import { ItemDetailsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/item/$itemId')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <AuthWrapper>
      <ItemDetailsScreen />
    </AuthWrapper>
  );
}
