import { AntDesign } from '@expo/vector-icons';
import { RText, XStack } from '@packrat/ui';
import React, { type FC } from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';

interface FavoriteButtonProps {
  isAuthUserFavorite: boolean;
  onClick: (e: GestureResponderEvent) => void;
  count: number;
}
export const FavoriteButton: FC<FavoriteButtonProps> = ({
  onClick,
  isAuthUserFavorite,
  count,
}) => {
  return (
    <XStack style={{ alignItems: 'center' }} space="$2">
      <Pressable onPress={onClick}>
        <AntDesign
          name="heart"
          size={16}
          color={isAuthUserFavorite ? 'red' : undefined}
        />
      </Pressable>
      <RText style={{ fontSize: 14 }}>{count}</RText>
    </XStack>
  );
};
