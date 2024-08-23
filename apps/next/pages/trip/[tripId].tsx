import { TripDetails } from 'app/screens/trip/TripDetails';
import { AuthWrapper } from 'app/modules/auth';

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
