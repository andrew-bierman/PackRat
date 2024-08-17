import React from 'react';
import { AddPack } from 'app/components/pack/AddPack';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function CreatePack() {
  return <AddPack />;
}

export default CreatePack;

CreatePack.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
