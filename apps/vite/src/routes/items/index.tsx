import Items from 'app/screens/items';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <>
      <Items />
    </>
  );
}

ItemsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
