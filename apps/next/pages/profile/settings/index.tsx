import { SettingsScreen } from 'app/modules/user';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

export default function SettingsPage() {
  return (
    <>
      <SettingsScreen />
    </>
  );
}

SettingsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
