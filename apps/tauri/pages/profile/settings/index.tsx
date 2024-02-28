import Settings from 'app/screens/user/Settings';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

export default function SettingsPage() {
  return (
    <>
      <Settings />
    </>
  );
}

SettingsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
