import Items from 'app/screens/items';

// export const runtime = 'experimental-edge';

export default function ItemsPage() {
  return (
    <>
      <Items />
    </>
  );
}

ItemsPage.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
