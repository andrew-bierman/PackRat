import React from 'react';
import { PackTemplateDetailsScreen } from 'app/modules/pack-templates';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

function PackTemplate() {
  return (
    <>
      <PackTemplateDetailsScreen />
    </>
  );
}

export default PackTemplate;

PackTemplate.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
