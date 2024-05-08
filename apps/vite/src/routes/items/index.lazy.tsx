import Items from 'app/screens/items';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/items/')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <AuthWrapper>
      <Items />
    </AuthWrapper>
  );
}
