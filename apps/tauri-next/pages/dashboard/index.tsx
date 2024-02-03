import Dashboard from 'app/screens/dashboard';

import { AuthWrapper } from 'auth/authWrapper';

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
