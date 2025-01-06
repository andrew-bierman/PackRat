import { ProfileScreen } from 'app/modules/user';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';

export default function Profile() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Profile</title>
        </Head>
      )}
      <ProfileScreen />
    </>
  );
}
