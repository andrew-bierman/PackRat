import React from 'react';
import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'auth/authWrapper';

function Packs() {
  return <Feed feedType="userPacks" />;
}

export default Packs;

Packs.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
