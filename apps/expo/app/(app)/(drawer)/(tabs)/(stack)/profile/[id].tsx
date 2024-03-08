import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import ProfileContainer from 'app/screens/user/ProfileContainer';
import Head from 'expo-router/head';
import { useProfileId } from 'app/hooks/user';

const Profile = () => {
  const { id } = useProfileId();
  const metaTitle = id ? `${id}'s Profile` : "Profile"
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>{metaTitle}</title>
          <meta name="description" content={metaTitle} />
        </Head>
      )}
      <Stack.Screen
        options={{
          title: metaTitle,
          name: metaTitle,
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
