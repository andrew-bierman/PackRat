import React from 'react';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { ProfileScreen, useProfile, useProfileId } from 'app/modules/user';
import Head from 'expo-router/head';
import { useRouterSettings } from 'app/hooks/router';

const Profile = () => {
  const [id] = useProfileId();
  const { user } = useProfile(id);
  const userRealName = user?.name ?? null;
  const { stackScreenOptionsHeaderSettings } = useRouterSettings();

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>{`${userRealName}'s Profile`}</title>
          <meta name="description" content={`${userRealName}'s Profile`} />
        </Head>
      )}
      <Stack.Screen
        options={{
          title: userRealName ? `${userRealName}'s Profile` : '',
          ...stackScreenOptionsHeaderSettings,
        }}
      />
      <ProfileScreen userId={id} />
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
