import { Card, RButton, RStack, RSwitch, RText, Switch } from '@packrat/ui';
import React, { useEffect, useState, type FC } from 'react';
import { PackImage } from 'app/modules/pack/components/PackCard/PackImage';
import { FavoriteButton } from 'app/modules/feed';
import { type PackDetails } from 'app/modules/pack/model';
import useTheme from 'app/hooks/useTheme';
import { useUserPacks } from 'app/modules/pack/hooks';
import { ScoreLabel } from 'app/components/ScoreLabel';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { type UserDataCardProps } from './model';
import { useSetPackVisibility } from 'app/modules/pack/useSetPackVisibility';

interface PackCardProps extends UserDataCardProps<PackDetails> {}

export const UserPackCard: FC<PackCardProps> = (props) => {
  const { setPackVisibility, isLoading } = useSetPackVisibility();

  const { currentTheme } = useTheme();

  const { refetch } = useUserPacks(props.ownerId, {}, '', true);

  const updateIsPublic = (value) => {
    setPackVisibility({ id: props.id, name: props.title, is_public: value });
  };

  return (
    <Card
      title={props.title}
      link={`/pack/${props.id}`}
      image={<PackImage />}
      subtitle={
        <ScoreLabel
          score={
            props.details.similarityScore !== undefined &&
            !isNaN(props.details.similarityScore)
              ? props.details.similarityScore
              : Number(props.details.score)
          }
        />
      }
      actions={
        <RStack
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          {props.isAuthUserProfile && (
            <RButton
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                padding: 0,
                opacity: isLoading ? 0.4 : 1,
              }}
              unstyled
              onPress={() => updateIsPublic(!props.isPublic)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {props.isPublic ? (
                <Eye style={{ pointerEvents: 'none' }} />
              ) : (
                <EyeOff style={{ pointerEvents: 'none' }} />
              )}
            </RButton>
          )}
          <FavoriteButton
            count={props.favoriteCount}
            isAuthUserFavorite={props.isUserFavorite ?? false}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.toggleFavorite?.();
              refetch();
            }}
          />
        </RStack>
      }
      type={props.cardType}
      style={{
        borderColor: props.isPublic
          ? currentTheme.colors.secondaryBlue
          : currentTheme.colors.background,
        borderWidth: 2,
      }}
    />
  );
};
