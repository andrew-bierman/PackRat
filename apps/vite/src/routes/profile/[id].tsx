import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import ProfileContainer from 'app/screens/user/ProfileContainer';
import { useProfileId } from 'app/hooks/user';
import { AuthWrapper } from 'app/auth/AuthWrapper';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/[id]')({
  component: () => null,
});

const Profile = () => {
  const [id] = useProfileId();

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
