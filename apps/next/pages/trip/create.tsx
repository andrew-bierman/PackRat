import CreateTrip from 'app/screens/trip/createTrip';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

export default function Trip() {
  return (
    <>
      <CreateTrip />
    </>
  );
}

Trip.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
