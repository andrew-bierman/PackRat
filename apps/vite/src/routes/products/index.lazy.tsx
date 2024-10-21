import { ProductsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/products/')({
  component: ProductsPage,
});

export default function ProductsPage() {
  return (
    <AuthWrapper>
      <ProductsScreen />
    </AuthWrapper>
  );
}
