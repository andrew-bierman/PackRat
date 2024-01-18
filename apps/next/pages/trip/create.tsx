import CreateTrip from 'app/screens/trip/createTrip';
import { AuthWrapper } from 'pages/authWrapper';

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