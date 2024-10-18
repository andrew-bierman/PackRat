import { ItemsScreen, GetItemsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuthUser } from 'app/modules/auth';
import { Text } from 'tamagui'

export const Route = createLazyFileRoute('/items/')({
  component: ItemsPage,
});

export default function ItemsPage() {
  const user = useAuthUser();

  if (user.role === 'user') {
    const navigate = useNavigate();
    navigate('/not-authoried')
    return <Text style={{textAlign: 'center', minHeight: '100vh', marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>Not Available On Me</Text>;
  }

  return (
    <AuthWrapper>
      {/* <ItemsScreen /> */}
      <GetItemsScreen />
    </AuthWrapper>
  );
}
