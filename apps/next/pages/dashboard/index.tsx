import Dashboard from 'app/screens/dashboard';

import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge';

export default function DashboardPage() {
  return (
    <>
      <Dashboard />
    </>
  );
}

DashboardPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
