import { ItemsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
// export const runtime = 'experimental-edge';
import { useAuthUser } from 'app/modules/auth';
import { Text } from 'tamagui';
import { useNavigate } from 'app/hooks/navigation';


export default function ItemsPage() {

  const user = useAuthUser();

  if (user.role === 'user') {
    const navigate = useNavigate();
    navigate('/not-authoried')
    return <Text style={{textAlign: 'center', minHeight: '100vh', marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>Not Available On Me</Text>;
  return (
    <>
      <ItemsScreen />
    </>
  );
}

ItemsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
