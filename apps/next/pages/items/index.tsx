import { ItemsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
// export const runtime = 'experimental-edge';

export default function ItemsPage() {
  return (
    <>
      <ItemsScreen />
    </>
  );
}

ItemsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
