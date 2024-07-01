import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import ProfileContainer from 'app/screens/user/ProfileContainer';
import Head from 'expo-router/head';
import { useProfile, useProfileId } from 'app/hooks/user';

const Profile = () => {
  const [id] = useProfileId();
  const { user } = useProfile(id);
  const userRealName = user?.name ?? null;

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>{`${userRealName}'s Profile`}</title>
          <meta name="description" content={`${userRealName}'s Profile`} />
        </Head>
      )}
      <Stack.Screen
        name={`${userRealName}'s Profile`}
        options={{
          title: `${userRealName}'s Profile`,
        }}
      />
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
