import { DestinationPage } from 'app/components/destination';
import { AuthWrapper } from 'app/auth/AuthWrapper';
// import DestinationPage from "../../components/destination";

// export const runtime = 'experimental-edge';

export default function Destination() {
  return (
    <>
      <DestinationPage />
    </>
  );
}

Destination.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
