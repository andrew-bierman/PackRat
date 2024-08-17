import React from 'react';
import { PackDetails } from 'app/components/pack/PackDetails';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function PackScreen() {
  return (
    <>
      <PackDetails />
    </>
  );
}

export default PackScreen;

PackScreen.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
