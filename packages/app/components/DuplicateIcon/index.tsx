import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'app/hooks/router';

export const DuplicateIcon = ({ link = null }) => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push(link);
  }, [router, link]);

  if (!link) return null;

  return (
    <Pressable onPress={handlePress}>
      <MaterialIcons name="file-copy" size={24} color="gray" />
    </Pressable>
  );
};
