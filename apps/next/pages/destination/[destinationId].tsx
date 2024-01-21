import { DestinationPage } from 'app/components/destination';
import { AuthWrapper } from 'auth/authWrapper';
// import DestinationPage from "../../components/destination";

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
