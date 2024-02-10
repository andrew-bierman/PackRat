import React from 'react';
import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

function Packs() {
  return <Feed feedType="userPacks" />;
}

export default Packs;

Packs.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
