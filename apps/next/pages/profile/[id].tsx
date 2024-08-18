import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import ProfileContainer from 'app/screens/user/ProfileContainer';
import { useProfileId } from 'app/modules/user';
import { AuthWrapper } from 'app/modules/auth';

// export const runtime = 'experimental-edge'

const Profile = () => {
  const [id] = useProfileId();

  console.log({ id });

  return (
    <>
      <ProfileContainer id={id} />
    </>
  );
};

const styles = StyleSheet.create({
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

Profile.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
