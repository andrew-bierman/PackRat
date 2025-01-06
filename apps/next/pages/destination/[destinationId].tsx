import { DestinationScreen } from 'app/modules/map/screens/DestinationScreen';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge';

export default function Destination() {
  return (
    <>
      <DestinationScreen />
    </>
  );
}

Destination.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
