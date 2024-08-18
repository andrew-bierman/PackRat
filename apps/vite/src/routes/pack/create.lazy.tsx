import { AddPackScreen } from 'app/modules/pack';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/pack/create')({
  component: CreatePack,
});

function CreatePack() {
  return (
    <AuthWrapper>
      <AddPackScreen />
    </AuthWrapper>
  );
}

export default CreatePack;

CreatePack.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
