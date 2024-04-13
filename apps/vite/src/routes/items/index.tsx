import Items from 'app/screens/items';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <AuthWrapper>
      <Items />
    </AuthWrapper>
  );
}
