import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function PackTemplates() {
  return <FeedScreen feedType="packTemplates" />;
}

export default PackTemplates;

PackTemplates.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
