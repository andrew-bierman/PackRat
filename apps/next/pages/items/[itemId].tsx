import React from 'react';
import { ItemDetailsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function ItemScreen() {
  return (
    <>
      <ItemDetailsScreen />
    </>
  );
}

export default ItemScreen;

ItemScreen.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
