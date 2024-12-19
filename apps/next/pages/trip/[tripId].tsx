import EditTripScreen from 'app/screens/trip/editTrip';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

export default function Trip() {
  return (
    <>
      <EditTripScreen />
    </>
  );
}

Trip.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
