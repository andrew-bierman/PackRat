import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function Packs() {
  return <FeedScreen feedType="userPacks" />;
}

export default Packs;

Packs.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
