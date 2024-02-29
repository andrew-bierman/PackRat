import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { RIconButton, RStack, RText, RSkeleton } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import useGetPacks from "../../hooks/useGetPacks";
import { useRouter } from 'app/hooks/router';

export const SettingsButton = () => {
  const router = useRouter();

  const onSettingsClick = () => {
    router.push('/profile/settings');
  };

  return (
    <RIconButton
      onPress={onSettingsClick}
      style={{
        backgroundColor: 'transparent',
        marginBottom: 16,
        justifyContent: 'center',
        border: '1px solid lightgray',
        borderRadius: 8,
      }}
      icon={
        <MaterialCommunityIcons name="cog-outline" size={24} color={'grey'} />
      }
    />
  );
};

export const SkeletonUserDataCard = () => {
  return (
    <View
      style={{
        borderRadius: 15,
        backgroundColor: 'lightgray',
        padding: 10,
        margin: 5,
        width: '90%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <RSkeleton style={{ marginBottom: 8, height: 50, width: '70%' }} />
      <RSkeleton style={{ marginBottom: 8, height: 50, width: '50%' }} />
      <RSkeleton style={{ height: 50, width: '30%' }} />
    </View>
  );
};
