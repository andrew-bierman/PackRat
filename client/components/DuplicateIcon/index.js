import { View, Text, Pressable } from 'react-native';
import { Box, Button, Menu } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const DuplicateIcon = ({ link = null }) => {
  if (!link) return null;

  const router = useRouter();

  const handlePress = () => {
    router.push(link);
  };

  return (
    <Pressable onPress={handlePress}>
      <MaterialIcons name="file-copy" size={24} color="gray" />
    </Pressable>
  );
};
