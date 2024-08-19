import React from 'react';
import { PackDetailsScreen } from 'app/modules/pack';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function PackScreen() {
  return (
    <>
      <PackDetailsScreen />
    </>
  );
}

export default PackScreen;

PackScreen.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
