import AppearanceContainer from 'app/screens/appearance/AppearanceContainer';
import { AuthWrapper } from 'auth/authWrapper';

// export const runtime = 'experimental-edge';

export default function Appearance() {
  return (
    <>
      <AppearanceContainer />
    </>
  );
}

Appearance.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
