import { useSearchParams, Stack as Header } from 'expo-router';

import { Platform } from 'react-native';
import ProfileContainer from '../../../screens/user/ProfileContainer';
import useCustomStyles from '~/hooks/useCustomStyles';

const Profile = () => {
  const { id } = useSearchParams();
  const styles = useCustomStyles(loadStyles);

  return Platform.OS === 'web' ? (
    <>
      <Header.Screen
        options={{
          title: `${id}'s Profile`,
        }}
      />
      <ProfileContainer id={id} />
    </>
  ) : (
    <ProfileContainer id={id} />
  );
};

const loadStyles = () => ({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});

export default Profile;
