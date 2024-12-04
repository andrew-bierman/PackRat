import { ProductsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
// export const runtime = 'experimental-edge';

export default function ProductsPage() {
  return (
    <>
      <ProductsScreen />
    </>
  );
}

ProductsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
