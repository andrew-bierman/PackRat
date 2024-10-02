import React, { type FC } from 'react';
import { RStack, RText } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import { StarIcon } from 'lucide-react-native';

interface ScoreLabelProps {
  score: number;
}
export const ScoreLabel: FC<ScoreLabelProps> = ({ score }) => {
  const { currentTheme } = useTheme();

  return (
    <RStack
      style={{
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <StarIcon size={16} color={currentTheme.colors.text} />
      <RText>{score}</RText>
    </RStack>
  );
};
