import React from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'app/hooks/router';

export const DuplicateIcon = ({ link = null }: { link: string }) => {
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
