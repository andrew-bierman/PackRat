import React from 'react';
import { AddPackScreen } from 'app/modules/pack';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function CreatePack() {
  return <AddPackScreen />;
}

export default CreatePack;

CreatePack.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
