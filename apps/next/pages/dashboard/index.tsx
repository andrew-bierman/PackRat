import { DashboardScreen } from 'app/modules/dashboard';

import { AuthWrapper } from 'app/auth/AuthWrapper';

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
