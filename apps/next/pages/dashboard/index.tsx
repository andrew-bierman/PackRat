import { DashboardScreen } from 'app/modules/dashboard';

import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge';

export default function DashboardPage() {
  return (
    <>
      <DashboardScreen />
    </>
  );
}

DashboardPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
