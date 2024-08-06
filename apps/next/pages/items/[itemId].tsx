import React from 'react';
import ItemDetails from 'app/screens/items/item-details';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

function ItemScreen() {
  return (
    <>
      <ItemDetails />
    </>
  );
}

export default ItemScreen;

ItemScreen.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
