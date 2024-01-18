import Settings from 'app/screens/user/Settings';
import { AuthWrapper } from 'pages/authWrapper';

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