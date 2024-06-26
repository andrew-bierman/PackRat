import { TripDetails } from 'app/screens/trip/TripDetails';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

export default function Trip() {
  return (
    <>
      <TripDetails />
    </>
  );
}

Trip.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
