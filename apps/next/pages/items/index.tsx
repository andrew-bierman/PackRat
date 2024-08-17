import Items from 'app/screens/items';
import { AuthWrapper } from 'app/modules/auth';
// export const runtime = 'experimental-edge';

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
